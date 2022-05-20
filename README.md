Wanted to test out deno and read the article https://www.troyhunt.com/downloading-pwned-passwords-hashes-with-the-hibp-downloader/ about https://github.com/HaveIBeenPwned/PwnedPasswordsDownloader and thought it would be fun to do it in deno

```
deno run --allow-net=api.pwnedpasswords.com --allow-write=./output --allow-env=HOME,NODE_DEBUG --allow-read=./output index.ts
```
