---
title: "Prompt Evaluation Framework"
description: "A lightweight, open-source framework for running structured evals on LLM prompts — catching regressions before they reach production."
tags: [Evals, LLMOps, Python, Open Source]
thumbnail: "/thumbnails/prompt-eval-framework.png"
role: "Author & maintainer"
timeline: "Q1 2025 — ongoing"
impact: "25 GitHub stars in first month; integrated into CI pipelines by 3 external teams."
draft: false
---

## Problem

Prompt changes are notoriously hard to test. Teams ship "improvements" that silently degrade performance on edge cases outside their mental model — and don't find out until a user reports it.

I broke a production summarization prompt by making it "more concise." It started dropping key dates in edge cases I hadn't tested. The diagnosis took a day. I wanted a way to catch that class of regression automatically, without requiring engineers to write Python for every new test case.

## Approach

Evals should be **data, not code**. Teams should be able to add test cases without touching Python — just edit a YAML file. The framework handles execution, retries, concurrency, and diffing.

For grading, I implemented two modes:
- **Exact/regex match** — fast and deterministic; right for structured outputs
- **LLM-as-judge** — for open-ended outputs where exact match is too brittle; uses a rubric-based prompt with a calibration step

## Solution

YAML-defined eval suites that specify:
- `input` — the prompt variables
- `expected` — a regex pattern, or a natural-language rubric for judge mode
- `severity` — `critical` (blocks CI) or `warning` (reports only)

The CLI runs the suite against any OpenAI-compatible endpoint, produces a structured JSON diff report, and exits non-zero on critical failures — making it CI-native by design.

```yaml
# Example eval suite
suite: summarization-v2
model: gpt-4o
evals:
  - id: preserves-dates
    input:
      text: "The deadline is March 15. The review is April 2."
    expected:
      pattern: "March 15|April 2"
    severity: critical

  - id: handles-empty-input
    input:
      text: ""
    expected:
      judge: "The response should gracefully handle empty input without hallucinating content."
    severity: warning
```

## Systems Thinking

### Dependencies
- Any OpenAI-compatible endpoint — works with OpenAI, Anthropic (via proxy), Ollama, etc.
- The LLM-judge feature requires a second model call per eval, which doubles cost for judge-mode suites
- CI integration requires the framework to be installed in the pipeline environment

### Constraints
- LLM-as-judge scores are probabilistic — the same eval can return different scores on repeat runs; averaging over 3 runs is recommended for judge-mode evals
- Large eval suites with many judge-mode evals can become expensive; the framework tracks and reports token costs per run
- No built-in versioning of eval results — teams need to wire up their own storage if they want historical trend data

### Edge Cases
- Eval YAML with missing required fields fails loudly with a schema validation error (intentional)
- Models that don't support system prompts need a `prompt_format: user_only` flag in the suite config
- Rate limit errors during a suite run use exponential backoff; a full quota exhaustion pauses the run and resumes after a configurable delay

## Outcome

Three external teams integrated it into their CI pipelines within the first month, which validated the design goal of zero-friction adoption. The primary feedback was that the YAML schema needed better documentation and IDE support.

I added a JSON Schema for the YAML format, which enables autocomplete and inline validation in VS Code — the adoption friction from schema uncertainty dropped noticeably after that.

## Learnings

- **Releasing with a motivating story** (the date-dropping incident) drove more organic adoption than the feature list. People shared it because the problem resonated.
- The **LLM-judge calibration step** is underused but critical — without it, teams trust judge scores that have systematic bias. I need to make it more visible in the docs.
- YAML is a good choice for eval definitions but a bad choice for complex templating; the next version will support Jinja2 templates in the `input` field.
- Open-source maintenance overhead was higher than expected. A CONTRIBUTING guide and issue templates cut triage time by roughly half.
