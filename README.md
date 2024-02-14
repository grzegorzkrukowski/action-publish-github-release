# action-publish-github-release

[![test](https://github.com/grzegorzkrukowski/action-publish-github-release/actions/workflows/test.yml/badge.svg)](https://github.com/grzegorzkrukowski/action-publish-github-release/actions/workflows/test.yml)

Publish GitHub Release

```yaml
name: Publish Release
uses: grzegorzkrukowski/action-publish-github-release@v1
with:
  tag_name: 'v1.0.0'
  token: ${{ github.token }}
```

Throws an error when a release is not found or it's already published (not a draft).
