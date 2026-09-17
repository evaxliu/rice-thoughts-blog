# Rice Thoughts


*A guy who likes rice and thinks.*

Rice Thoughts is a blog focused on long-form essays covering politics, culture, technology, and current events. The project is built with Next.js and TypeScript and is currently evolving into a full-stack platform with AI-powered content discovery.

## Current Features

* Dynamic blog post rendering
* Responsive user interface
* AI-powered related article recommendations
* Voyage AI embedding generation
* Semantic similarity search using vector embeddings
* Supabase database integration
* FastAPI backend for AI and data processing workflows

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python

### Database

* Supabase
* PostgreSQL
* pgvector

### AI

* Voyage AI
* Embeddings
* Semantic Search
* Vector Search

## AI-Powered Related Posts

To improve content discovery, Rice Thoughts uses vector embeddings and semantic search to recommend related articles.

Current workflow:

1. Article content is sent to Voyage AI.
2. Voyage AI generates an embedding vector representing the article's semantic meaning.
3. The embedding is stored in Supabase using pgvector.
4. Vector similarity search identifies semantically related articles.
5. Related articles are surfaced to readers.

This feature improves content discovery without generating or modifying article content, keeping all writing fully human-authored.

## Planned Features

* Custom CMS built with Next.js and Supabase
* Authentication and author management
* Article publishing workflow
* Tag-based filtering
* Search functionality
* Enhanced content categorization

## Project Goals

This project was built to explore full-stack development, AI integration, vector databases, and semantic search in a real-world application. Through building the related posts feature, I gained hands-on experience with embeddings, vector similarity search, pgvector, FastAPI, and integrating external AI services into a production-style web application.
