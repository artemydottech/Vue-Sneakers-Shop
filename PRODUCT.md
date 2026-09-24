# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience: hiring managers and frontend leads who open the project from a portfolio or CV and spend a few minutes judging the author's frontend craft — layout, states, responsiveness, attention to detail. They click through the store as if they were a shopper, on desktop first, often on a phone second.

The in-fiction user is a streetwear shopper in Russia choosing a pair of sneakers: browse, compare, pick a size, check out.

## Product Purpose

«Пара» — a fictional multi-brand streetwear sneaker store (Nike, Jordan, adidas, New Balance, Asics, Converse, Vans, Puma, Reebok). The project exists to demonstrate a complete, believable e-commerce frontend built on mock data. Success: a reviewer walks home → catalogue → product → size → cart → checkout without hitting a dead end, a placeholder, or a broken state, and remembers the store.

## Positioning

A portfolio piece that behaves like a real store end to end — not a single-page catalogue demo. Every screen has its loading, empty and error states, and the flow survives reloads (cart, favourites and orders persist locally).

## Operating Context

- Deployed as a static site on GitHub Pages under `/Vue-Sneakers-Shop/`, hash routing.
- No backend: catalogue comes from local mocks through `src/services/api` (switchable to a real API via `VITE_API_URL`); cart, favourites and orders live in `localStorage`.
- Checkout is simulated: no payment, no real delivery.

## Capabilities and Constraints

- Stack is fixed: Vue 3 `<script setup>` + TypeScript strict, Pinia, vue-router (hash), Tailwind CSS + SCSS, Vite. No new runtime dependencies without the author's approval.
- Prices in rubles, Russian-language UI.
- Product photos: the original 12 course images plus curated Unsplash photos under the Unsplash License, credited in `public/sneakers/u/CREDITS.md`. No retailer or brand-owned photography.
- Product names, specs and prices are plausible mock data modelled on real lines; stock, ratings and reviews are invented and must read as mock, not as claims about real products.

## Brand Commitments

- Name: «Пара». Voice: polite «вы», short and concrete, no marketing superlatives.

## Evidence on Hand

- Photos in `public/sneakers/` (course set) and `public/sneakers/u/` (Unsplash set).
- No real customers, testimonials, press, partners or delivery terms exist. Reviews are clearly mock content; no fabricated brand partnerships or "official dealer" claims.

## Product Principles

1. The whole flow works: no dead links, no "coming soon", every state designed.
2. Craft shows in details a reviewer notices in minutes: size selection, filters, empty states, mobile layout.
3. Honest mock: invented data stays plausible and never pretends to be real business facts.
4. Fast and light: static hosting, lazy routes, optimized images.

## Accessibility & Inclusion

WCAG 2.1 AA as the working bar: keyboard-reachable flow, visible focus, labelled controls, sufficient contrast.
