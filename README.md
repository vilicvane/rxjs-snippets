# RxJS Snippets

A collection of RxJS snippets that took me some time to write and might be useful in the future.

## Run Snippet

```sh
npx tsx ./snippets/[name].ts

# e.g.,
npx tsx ./snippets/periodically-ignore.ts
```

## Snippets

- [Periodically Ignore](./snippets/periodically-ignore.ts)

  Periodically ignore
  values from source observable if `tick$` emits not earlier than `timeout`
  milliseconds ago.

## License

MIT License.
