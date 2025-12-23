export class ContentValidator {
  private buzzwords = [
    'rockstar', 'ninja', 'guru', 'wizard', 'hustler',
    'work hard play hard', 'wear many hats', 'fast-paced environment',
    'self-starter', 'hit the ground running', 'synergy', 'disrupt'
  ];

  validate(content: string): { isValid: boolean; warnings: string[] } {
    const warnings: string[] = [];
    const lowerContent = content.toLowerCase();

    this.buzzwords.forEach(word => {
      if (lowerContent.includes(word)) {
        warnings.push(`Contains buzzword: "${word}". Consider being more specific.`);
      }
    });

    // Check for length/substance
    if (content.length < 50) {
      warnings.push('Content seems too short. Please provide more detail.');
    }

    return {
      isValid: true, // We warn but don't block for now
      warnings,
    };
  }
}

export const contentValidator = new ContentValidator();
