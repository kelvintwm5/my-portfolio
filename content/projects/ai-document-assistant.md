---
title: "AI Document Assistant"
description: "An LLM-powered tool that lets users upload PDFs and ask natural-language questions, returning cited answers in seconds."
tags: [LLM, RAG, Next.js, Python]
thumbnail: "/thumbnails/ai-document-assistant.png"
role: "Solo engineer & designer"
timeline: "Q3 2024 — 6 weeks"
impact: "Reduced average document-lookup time from ~12 minutes to under 30 seconds across 20 user-testing participants."
draft: false
---

## Problem

Knowledge workers waste hours hunting through long PDFs for specific information. Existing tools return pages, not answers — you still have to read and interpret the result yourself.

I observed colleagues repeatedly ctrl-F through 80-page policy documents during meetings, often failing to surface what they needed in time. The gap wasn't search — it was comprehension at scale.

## Approach

I chose a retrieval-augmented generation (RAG) architecture: chunk the document, embed the chunks, retrieve semantically similar ones at query time, then pass them to a language model with a strict citation prompt.

Key decisions:
- **Paragraph-level chunking with 10% overlap** — preserves context across chunk boundaries, reduces fragmented answers
- **text-embedding-3-small** — fast and cheap; accuracy difference vs. large was negligible on this domain
- **Pinecone** — chosen over Chroma and Weaviate for managed infra and sub-100ms p95 query latency
- **Confidence threshold** — responses below 0.75 cosine similarity trigger a "not sure" fallback rather than guessing

## Solution

A web app where users drag in a PDF, wait ~10 seconds for indexing, then ask questions in a chat interface. Each answer includes inline citations linking back to the source paragraph.

The backend is a FastAPI service handling chunking, embedding, and retrieval. The frontend is Next.js with streaming responses so answers start appearing immediately rather than waiting for the full generation.

## Systems Thinking

### Dependencies
- OpenAI Embeddings API and GPT-4o — hard dependencies; rate limits and outages propagate directly to users
- Pinecone free tier — limits to 1 index and 100k vectors; multi-user usage would exhaust this quickly

### Constraints
- PDF parsing quality degrades on scanned documents (no OCR implemented)
- Context window limits mean only the top-5 chunks are passed to the model; for very long answers, relevant context may be cut off
- Free-tier Pinecone requires a cold-start re-connection after inactivity

### Edge Cases
- PDFs with no selectable text (image-only scans) silently produce empty indexes
- Questions spanning multiple disconnected sections of a document sometimes get partial answers
- Very short documents (< 3 chunks) can cause retrieval to return all chunks regardless of relevance

## Outcome

Median answer time dropped from ~12 minutes (manual search) to under 30 seconds. In user testing, participants successfully located specific data points in a 60-page report with 100% accuracy vs. 70% with manual search in the same time window.

The citation feature was highlighted by every tester as the most trust-building element — they wanted to verify, not just accept the answer.

## Learnings

- **Chunking strategy matters more than model choice** at this scale. Sentence-level chunks produced more fragmented, context-poor answers than paragraph-level.
- **Confidence thresholds are worth the UX trade-off.** Users preferred an honest "I don't know" to a plausible but wrong answer.
- **Streaming is table stakes.** The same latency felt acceptable with streaming and frustrating without it.
- The next iteration needs query decomposition — compound questions ("what are the deadlines and who is responsible?") should be split before retrieval.
