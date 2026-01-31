import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import { X, Heart, MapPin, Building2, GraduationCap, Briefcase, RotateCcw, Star } from 'lucide-react-native';
import { api, SwipeCard } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

interface SwipeScreenProps {
  user: {
    id: string;
    email: string;
    role: 'STUDENT' | 'RECRUITER' | null;
  } | null;
}

export default function SwipeScreen({ user }: SwipeScreenProps) {
  const [cards, setCards] = useState<SwipeCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matchModal, setMatchModal] = useState<{ show: boolean; name: string } | null>(null);

  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const isRecruiter = user?.role === 'RECRUITER';

  const fetchCards = async () => {
    try {
      const response = await api.getSwipeCards(isRecruiter ? 'candidates' : 'jobs');
      setCards(response.cards);
    } catch (error) {
      console.error('Failed to fetch swipe cards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
      friction: 5,
    }).start();
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => handleSwipeComplete('left'));
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => handleSwipeComplete('right'));
  };

  const handleSwipeComplete = async (direction: 'left' | 'right') => {
    const currentCard = cards[currentIndex];
    if (!currentCard) return;

    try {
      const response = await api.swipe(currentCard.id, direction === 'right' ? 'like' : 'pass');
      if (response.match) {
        setMatchModal({ show: true, name: currentCard.name });
      }
    } catch (error) {
      console.error('Failed to record swipe:', error);
    }

    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => prev + 1);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      swipeLeft();
    } else {
      swipeRight();
    }
  };

  const renderCard = (card: SwipeCard, index: number) => {
    if (index < currentIndex) return null;

    if (index === currentIndex) {
      return (
        <Animated.View
          key={card.id}
          {...panResponder.panHandlers}
          style={[
            styles.cardContainer,
            {
              transform: [{ rotate }, { translateX: position.x }, { translateY: position.y }],
            },
          ]}
        >
          <CardContent card={card} isRecruiter={isRecruiter} />
          <SwipeOverlay position={position} />
        </Animated.View>
      );
    }

    return (
      <StyledView key={card.id} className="absolute w-full" style={{ zIndex: -index }}>
        <CardContent card={card} isRecruiter={isRecruiter} />
      </StyledView>
    );
  };

  if (loading) {
    return (
      <StyledView className="flex-1 bg-eggshell items-center justify-center">
        <ActivityIndicator size="large" color="#A8D5BA" />
        <StyledText className="mt-4 text-steelGray">Loading cards...</StyledText>
      </StyledView>
    );
  }

  const noMoreCards = currentIndex >= cards.length;

  return (
    <StyledView className="flex-1 bg-eggshell">
      {/* Header */}
      <StyledView className="bg-white px-6 pt-4 pb-4 border-b border-softGray">
        <StyledText className="text-2xl font-bold text-deepBlue">
          {isRecruiter ? 'Discover Talent' : 'Discover Jobs'}
        </StyledText>
        <StyledText className="text-steelGray text-sm mt-1">
          Swipe right to show interest, left to pass
        </StyledText>
      </StyledView>

      {/* Cards */}
      <StyledView className="flex-1 items-center justify-center px-4">
        {noMoreCards ? (
          <StyledView className="items-center px-8">
            <StyledView className="w-20 h-20 bg-pastelGreenLight rounded-full items-center justify-center mb-4">
              <Star color="#81C784" size={40} />
            </StyledView>
            <StyledText className="text-deepBlue font-bold text-xl mb-2 text-center">
              You've seen all cards
            </StyledText>
            <StyledText className="text-steelGray text-center mb-6">
              Check back later for new {isRecruiter ? 'candidates' : 'opportunities'}
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => {
                setCurrentIndex(0);
                fetchCards();
              }}
              className="bg-pastelGreen px-6 py-3 rounded-full flex-row items-center"
            >
              <RotateCcw color="white" size={18} />
              <StyledText className="text-white font-semibold ml-2">Refresh</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        ) : (
          <StyledView className="w-full h-[500px] items-center justify-center">
            {cards.slice(currentIndex, currentIndex + 3).reverse().map((card, i) => renderCard(card, currentIndex + (2 - i)))}
          </StyledView>
        )}
      </StyledView>

      {/* Action Buttons */}
      {!noMoreCards && (
        <StyledView className="flex-row justify-center items-center gap-6 pb-8">
          <StyledTouchableOpacity
            onPress={() => handleButtonSwipe('left')}
            className="w-16 h-16 bg-pastelRedLight rounded-full items-center justify-center shadow-md"
          >
            <X color="#F4A5A5" size={32} />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => handleButtonSwipe('right')}
            className="w-16 h-16 bg-pastelGreenLight rounded-full items-center justify-center shadow-md"
          >
            <Heart color="#A8D5BA" size={32} />
          </StyledTouchableOpacity>
        </StyledView>
      )}

      {/* Match Modal */}
      {matchModal?.show && (
        <StyledView className="absolute inset-0 bg-black/50 items-center justify-center px-8">
          <StyledView className="bg-white rounded-2xl p-6 items-center w-full max-w-sm">
            <StyledView className="w-20 h-20 bg-pastelGreenLight rounded-full items-center justify-center mb-4">
              <Heart color="#81C784" size={40} />
            </StyledView>
            <StyledText className="text-deepBlue font-bold text-2xl mb-2">It's a Match!</StyledText>
            <StyledText className="text-steelGray text-center mb-6">
              You and {matchModal.name} have shown mutual interest
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => setMatchModal(null)}
              className="bg-pastelGreen px-8 py-3 rounded-full"
            >
              <StyledText className="text-white font-semibold">Continue Swiping</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
}

interface CardContentProps {
  card: SwipeCard;
  isRecruiter: boolean;
}

function CardContent({ card, isRecruiter }: CardContentProps) {
  return (
    <StyledView className="bg-white rounded-2xl shadow-lg mx-4 overflow-hidden border border-softGray">
      {/* Card Header */}
      <StyledView className="bg-pastelGreen p-6">
        <StyledView className="w-20 h-20 bg-white rounded-full items-center justify-center mb-3 self-center">
          {isRecruiter ? (
            <GraduationCap color="#A8D5BA" size={40} />
          ) : (
            <Building2 color="#A8D5BA" size={40} />
          )}
        </StyledView>
        <StyledText className="text-white text-2xl font-bold text-center">{card.name}</StyledText>
        <StyledText className="text-white/80 text-center mt-1">{card.subtitle}</StyledText>
      </StyledView>

      {/* Card Body */}
      <StyledView className="p-5">
        <StyledView className="flex-row items-center mb-3">
          <MapPin color="#A8D5BA" size={16} />
          <StyledText className="text-slateBlue ml-2">{card.location}</StyledText>
        </StyledView>

        <StyledText className="text-steelGray leading-relaxed mb-4">{card.description}</StyledText>

        {/* Tags */}
        <StyledView className="flex-row flex-wrap gap-2">
          {card.tags.map((tag, index) => (
            <StyledView key={index} className="bg-pastelGreenLight px-3 py-1 rounded-full">
              <StyledText className="text-pastelGreenDark text-xs font-medium">{tag}</StyledText>
            </StyledView>
          ))}
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

interface SwipeOverlayProps {
  position: Animated.ValueXY;
}

function SwipeOverlay({ position }: SwipeOverlayProps) {
  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View
        style={[styles.likeOverlay, { opacity: likeOpacity }]}
      >
        <StyledText className="text-white font-bold text-xl">LIKE</StyledText>
      </Animated.View>
      <Animated.View
        style={[styles.nopeOverlay, { opacity: nopeOpacity }]}
      >
        <StyledText className="text-white font-bold text-xl">PASS</StyledText>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    width: '100%',
  },
  likeOverlay: {
    position: 'absolute',
    top: 80,
    left: 32,
    backgroundColor: '#A8D5BA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-12deg' }],
  },
  nopeOverlay: {
    position: 'absolute',
    top: 80,
    right: 32,
    backgroundColor: '#F4A5A5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '12deg' }],
  },
});
