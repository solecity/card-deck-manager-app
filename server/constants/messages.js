export const GENERAL = {
  INVALID_ID: "Invalid id",
  UNAUTHORIZED: "You don't have permissions for this action"
};

export const LOGIN = {
  UNAUTHORIZED: "Wrong username or password",
  UNAUTHENTICATED: "Unauthenticated"
};

export const USER = {
  CREATED: "User created successfully",
  DELETED: "User deleted successfully",
  UPDATED: "User updated successfully",
  NOT_FOUND: "User not found",
  INVALID_ID: "Invalid user id",
  CONFLIT_USERNAME: "Username is already taken",
  FORBIDDEN_DELETE: "You cannot delete yourself"
};

export const COLLECTION = {
  CREATED: "Collection created successfully",
  DELETED: "Collection deleted successfully",
  UPDATED: "Collection updated successfully",
  NOT_FOUND: "Collection not found",
  INVALID_ID: "Invalid collection id",
  DOES_NOT_BELONG_LOGGED_USER: "This collection does not belong to you",
  DOES_NOT_BELONG_USER: "This collection does not belong to this card user"
};

export const CARD = {
  CREATED: "Card created successfully",
  DELETED: "Card deleted successfully",
  UPDATED: "Card updated successfully",
  NOT_FOUND: "Card not found",
  INVALID_ID: "Invalid card id",
  DOES_NOT_BELONG_LOGGED_USER: "This card does not belong to you",
  DOES_NOT_BELONG_USER: "This card does not belong to this collection user"
};
