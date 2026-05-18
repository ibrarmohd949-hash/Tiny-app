# Security Specification - Tiny Tiny Tok Tok

## Data Invariants
1. A video must have a valid `userId` (the creator).
2. A like must correspond to an existing video.
3. A comment must correspond to an existing video and include a valid `userId`.
4. Users can only modify their own videos, comments, and profile data.
5. `isVerified` and `isAdmin` flags on `User` documents can only be set by an admin (or system).
6. Followers/Following states must be kept in sync (though for simplicity in rules, we mostly focus on write integrity).

## The Dirty Dozen (Malicious Payloads)
1. **Identity Spoofing**: Attempt to create a video with a `userId` that is not the authenticated user.
2. **Privilege Escalation**: User tries to update their own `User` doc to set `isAdmin: true`.
3. **Verification Spoofing**: User tries to update their own `User` doc to set `isVerified: true`.
4. **Metadata Corruption**: Attempt to set `likesCount` to a massive number when creating a video.
5. **Shadow Field Injection**: Create a video with an undocumented field `hiddenFlag: true`.
6. **Orphaned Write**: Create a comment for a `videoId` that does not exist.
7. **Social Manipulation**: Create a follow entry for another user without their consent (though rules usually allow public follows).
8. **Unauthorized Deletion**: User A tries to delete User B's video.
9. **Spam Injection**: Create a comment with a text size of 100KB.
10. **Resource Exhaustion**: Use an extremely long string (1KB+) as a document ID.
11. **State Shortcut**: Try to update a video's `createdAt` timestamp.
12. **PII Leak**: An unauthenticated user tries to list all user documents to scrape emails.

## Test Runner Plan
I will implement `firestore.rules` and verify them mentally against these payloads.

## Global Helpers
I will implement `isValidId`, `isSignedIn`, `isVerified`, `isAdmin`, `isValidUser`, `isValidVideo`, etc.
