export const StorageConstant ={
    Prefix: () => 'BugBuster_',
    Token: () => `${StorageConstant.Prefix()}Token`,
    UserProfile: () => `${StorageConstant.Prefix()}User_Profile`,
    TokenExpiration: () => `${StorageConstant.Prefix()}Token_Expiration`,
}