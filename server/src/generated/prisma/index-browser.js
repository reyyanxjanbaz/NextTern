
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  emailVerified: 'emailVerified',
  authStatus: 'authStatus',
  role: 'role',
  roleAssignedAt: 'roleAssignedAt',
  onboardingComplete: 'onboardingComplete',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLoginAt: 'lastLoginAt',
  preferences: 'preferences',
  companyId: 'companyId'
};

exports.Prisma.MagicLinkScalarFieldEnum = {
  id: 'id',
  tokenHash: 'tokenHash',
  email: 'email',
  userId: 'userId',
  used: 'used',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  isValid: 'isValid',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  state: 'state',
  name: 'name',
  headline: 'headline',
  photoUrl: 'photoUrl',
  location: 'location',
  institution: 'institution',
  degree: 'degree',
  fieldOfStudy: 'fieldOfStudy',
  graduationYear: 'graduationYear',
  roleTypes: 'roleTypes',
  industries: 'industries',
  learningGoals: 'learningGoals',
  intentStatement: 'intentStatement',
  availableFrom: 'availableFrom',
  duration: 'duration',
  hoursPerWeek: 'hoursPerWeek',
  locationPrefs: 'locationPrefs',
  timezone: 'timezone',
  portfolioUrl: 'portfolioUrl',
  linkedinUrl: 'linkedinUrl',
  githubUrl: 'githubUrl',
  otherLinks: 'otherLinks',
  visibility: 'visibility',
  isDiscoverable: 'isDiscoverable',
  lastActiveAt: 'lastActiveAt',
  completenessScore: 'completenessScore',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  name: 'name',
  category: 'category',
  proficiency: 'proficiency',
  hasProof: 'hasProof',
  proofs: 'proofs',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  name: 'name',
  logoUrl: 'logoUrl',
  description: 'description',
  website: 'website',
  industry: 'industry',
  size: 'size',
  stage: 'stage',
  locations: 'locations',
  isVerified: 'isVerified',
  verifiedAt: 'verifiedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InternshipScalarFieldEnum = {
  id: 'id',
  recruiterId: 'recruiterId',
  companyId: 'companyId',
  state: 'state',
  title: 'title',
  team: 'team',
  purpose: 'purpose',
  responsibilities: 'responsibilities',
  collaboration: 'collaboration',
  skillsToLearn: 'skillsToLearn',
  projectTypes: 'projectTypes',
  mentorshipAvailable: 'mentorshipAvailable',
  mentorshipDetails: 'mentorshipDetails',
  growthOpportunities: 'growthOpportunities',
  requiredSkills: 'requiredSkills',
  preferredSkills: 'preferredSkills',
  educationLevel: 'educationLevel',
  educationFields: 'educationFields',
  workAuthorization: 'workAuthorization',
  otherRequirements: 'otherRequirements',
  compensationType: 'compensationType',
  compensationAmount: 'compensationAmount',
  benefits: 'benefits',
  startDate: 'startDate',
  startDateFlexible: 'startDateFlexible',
  lengthMin: 'lengthMin',
  lengthMax: 'lengthMax',
  lengthUnit: 'lengthUnit',
  hoursPerWeekMin: 'hoursPerWeekMin',
  hoursPerWeekMax: 'hoursPerWeekMax',
  arrangement: 'arrangement',
  location: 'location',
  deadline: 'deadline',
  positions: 'positions',
  positionsFilled: 'positionsFilled',
  acceptingApplications: 'acceptingApplications',
  applicationProcess: 'applicationProcess',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  profileId: 'profileId',
  state: 'state',
  title: 'title',
  brief: 'brief',
  type: 'type',
  description: 'description',
  problem: 'problem',
  solution: 'solution',
  role: 'role',
  contributions: 'contributions',
  teamSize: 'teamSize',
  duration: 'duration',
  outcomes: 'outcomes',
  technologies: 'technologies',
  demonstratedSkills: 'demonstratedSkills',
  links: 'links',
  media: 'media',
  thumbnail: 'thumbnail',
  startDate: 'startDate',
  endDate: 'endDate',
  isOngoing: 'isOngoing',
  isFeatured: 'isFeatured',
  verificationStatus: 'verificationStatus',
  verifiedBy: 'verifiedBy',
  verifiedAt: 'verifiedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  profileId: 'profileId',
  recruiterId: 'recruiterId',
  internshipId: 'internshipId',
  currentState: 'currentState',
  stateEnteredAt: 'stateEnteredAt',
  stateHistory: 'stateHistory',
  closureReason: 'closureReason',
  closedAt: 'closedAt',
  closureFeedback: 'closureFeedback',
  studentViewed: 'studentViewed',
  recruiterViewed: 'recruiterViewed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MatchScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  internshipId: 'internshipId',
  applicationId: 'applicationId',
  studentInterested: 'studentInterested',
  studentInterestedAt: 'studentInterestedAt',
  recruiterInterested: 'recruiterInterested',
  recruiterInterestedAt: 'recruiterInterestedAt',
  isMatched: 'isMatched',
  matchedAt: 'matchedAt',
  chatUnlocked: 'chatUnlocked',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChatScalarFieldEnum = {
  id: 'id',
  matchId: 'matchId',
  applicationId: 'applicationId',
  isActive: 'isActive',
  lastMessageAt: 'lastMessageAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChatParticipantScalarFieldEnum = {
  id: 'id',
  chatId: 'chatId',
  userId: 'userId',
  lastReadAt: 'lastReadAt',
  unreadCount: 'unreadCount',
  joinedAt: 'joinedAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  chatId: 'chatId',
  senderId: 'senderId',
  content: 'content',
  contentType: 'contentType',
  attachments: 'attachments',
  isEdited: 'isEdited',
  editedAt: 'editedAt',
  isDeleted: 'isDeleted',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.AuthStatus = exports.$Enums.AuthStatus = {
  ANONYMOUS: 'ANONYMOUS',
  PENDING: 'PENDING',
  AUTHENTICATED: 'AUTHENTICATED',
  ONBOARDING: 'ONBOARDING'
};

exports.UserRole = exports.$Enums.UserRole = {
  STUDENT: 'STUDENT',
  RECRUITER: 'RECRUITER'
};

exports.CardState = exports.$Enums.CardState = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED'
};

exports.ProficiencyLevel = exports.$Enums.ProficiencyLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT'
};

exports.CompanySize = exports.$Enums.CompanySize = {
  STARTUP: 'STARTUP',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  ENTERPRISE: 'ENTERPRISE'
};

exports.CompanyStage = exports.$Enums.CompanyStage = {
  EARLY_STAGE: 'EARLY_STAGE',
  GROWTH: 'GROWTH',
  ESTABLISHED: 'ESTABLISHED',
  PUBLIC: 'PUBLIC'
};

exports.ProjectType = exports.$Enums.ProjectType = {
  PERSONAL: 'PERSONAL',
  ACADEMIC: 'ACADEMIC',
  PROFESSIONAL: 'PROFESSIONAL',
  HACKATHON: 'HACKATHON',
  OPEN_SOURCE: 'OPEN_SOURCE',
  FREELANCE: 'FREELANCE',
  RESEARCH: 'RESEARCH'
};

exports.ApplicationState = exports.$Enums.ApplicationState = {
  DISCOVERED: 'DISCOVERED',
  VIEWED: 'VIEWED',
  SHORTLISTED: 'SHORTLISTED',
  CONTACTED: 'CONTACTED',
  INTERVIEWING: 'INTERVIEWING',
  DECIDED: 'DECIDED',
  CLOSED: 'CLOSED'
};

exports.ClosureReason = exports.$Enums.ClosureReason = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  MagicLink: 'MagicLink',
  Session: 'Session',
  Profile: 'Profile',
  Skill: 'Skill',
  Company: 'Company',
  Internship: 'Internship',
  Project: 'Project',
  Application: 'Application',
  Match: 'Match',
  Chat: 'Chat',
  ChatParticipant: 'ChatParticipant',
  Message: 'Message'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
