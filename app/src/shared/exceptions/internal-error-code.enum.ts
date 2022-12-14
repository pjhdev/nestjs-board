export enum InternalErrorCode {
  // BOARD 1000 ~ 1099
  BOARD_NOT_FOUND = 1000,
  BOARD_PASSWORD_MISMATCH = 1001,
  BOARD_INVALID_SEARCH = 1002,

  // COMMENT 1100 ~ 1199
  COMMENT_NOT_FOUND = 1100,
  COMMENT_INVALID_DEPTH = 1101,
  COMMENT_PARENT_COMMENT_BOARD_ID_NOT_MATCHED = 1102,
}
