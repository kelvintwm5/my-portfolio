---
title: "Semantic Code Search"
description: "A developer tool that lets teams search their codebase by intent rather than exact keyword, powered by code-specific embeddings."
tags: [Embeddings, Developer Tools, TypeScript, Rust]
thumbnail: "/thumbnails/semantic-code-search.png"
role: "Lead engineer"
timeline: "Q4 2024 — 8 weeks"
impact: "Adopted by a 15-person engineering team; estimated 30% reduction in onboarding time per new engineer."
draft: false
---

## Problem

Grep and fuzzy-file-find break down when you don't remember exact function names, or when you want to find "the part that handles authentication" without knowing where it lives.

The gap between *what code does* and *what you search for* is semantic. Exact-match search requires you to already know the answer — precisely the situation where search is least useful.

## Approach

Index the repository at the function and class level, embed each chunk using a code-tuned model, then serve a local semantic search API that VS Code queries on demand.

The key insight was keeping everything local: no cloud sync, no auth, no data leaving the developer's machine. This removed the biggest adoption barrier for teams with proprietary codebases.

## Solution

A Rust-based indexer that:
1. Walks the repository tree
2. Parses files into function/class-level chunks using **Tree-sitter**
3. Batches embedding requests to Voyage AI's `voyage-code-2` model
4. Stores embeddings in **SQLite-vss** for local-first vector search

A VS Code extension calls a local HTTP server (started on first use) that queries the index and returns ranked results with file/line context.

## Systems Thinking

### Dependencies
- Tree-sitter grammar files per language — adding a new language requires a grammar; currently supports TypeScript, Python, Go, Rust
- Voyage AI embeddings API — only needed at index time; queries run fully offline after indexing
- SQLite-vss — an extension to SQLite; must be compiled for the target platform (pre-built binaries shipped for macOS/Linux/Windows)

### Constraints
- Initial index build time is the main friction point for first-time users
- Embedding dimension is fixed at index time; changing models requires a full re-index
- SQLite-vss approximate nearest-neighbor search degrades at very high vector counts (>1M); not an issue at typical repo sizes

### Edge Cases
- Monorepos with multiple languages require separate indexing passes per language grammar
- Generated files (e.g., `*.pb.go`, build artifacts) should be excluded via `.searchignore`; missed exclusions inflate the index and add noise
- Files with encoding issues (rare but real in legacy codebases) silently skip indexing

## Outcome

Initial indexing of a 200k-line TypeScript monorepo dropped from 4.5 minutes to 47 seconds after switching from sequential to parallel chunk embedding with a token-bucket rate limiter.

Engineers reported discovering existing utility functions they would otherwise have duplicated — a qualitative signal that the tool was changing how they explore code, not just how they search it.

## Learnings

- **Local-first design unlocks adoption** for teams that would never approve a cloud indexer. The architectural constraint became a selling point.
- **Tree-sitter grammar quality varies widely.** Early testing with the community Python grammar produced malformed chunks for complex decorators — had to patch the grammar.
- Shipping pre-built binaries for SQLite-vss was non-trivial but essential; asking users to compile a C extension killed adoption in beta.
- Next: incremental re-indexing on file save (currently requires a full re-index), and a natural-language refactor suggestion mode.
