# FRAMEWORK.md

# AI WiFi Optimizer — Development Framework Guide

This document defines the complete development framework, architecture, coding standards, tools, APIs, workflows, and engineering rules for the AI WiFi Optimizer Windows application.

The AI agent must follow this framework strictly during development.

---

# Project Overview

## Project Name
AI WiFi Optimizer

## Platform
Windows Desktop Application

## Goal
Build a lightweight AI-powered desktop application that:
- Tests internet speed
- Detects the fastest server
- Measures ping and stability
- Automatically selects the best server
- Optimizes internet performance
- Provides real-time monitoring

---

# Recommended Core Stack

# Desktop Framework

## Preferred Framework
Tauri

Reason:
- Extremely lightweight
- Low RAM usage
- Better performance than Electron
- Rust backend support
- Secure architecture

Alternative:
- Electron.js

---

# Frontend Framework

## Preferred Stack
- React.js
- TypeScript
- Vite

## Styling
- Tailwind CSS

## State Management
- Zustand

## Data Visualization
- Recharts

## Animations
- Framer Motion

---

# Backend Framework

## Preferred Backend
Rust

Reason:
- High performance
- Low memory usage
- Better networking performance
- Native Tauri integration

Alternative:
- Node.js + Express

---

# AI Framework

## Recommended AI Stack
Python Microservice

Libraries:
- Scikit-learn
- TensorFlow
- NumPy
- Pandas
- ONNX Runtime

---

# Database Framework

## Local Database
SQLite

ORM Options:
- Prisma
- Diesel (Rust)
- Drizzle ORM

---

# Application Architecture

# Architecture Style

Preferred:
- Clean Architecture
- Feature-Based Structure
- Modular Development

---

# System Architecture

UI Layer
↓
Frontend Services
↓
Backend API Layer
↓
Network Engine
↓
AI Optimization Engine
↓
Database Layer

---

# Frontend Architecture

## Frontend Folder Structure

/frontend
/src
/components
/pages
/layouts
/hooks
/store
/services
/utils
/types
/charts
/assets

---

# Component Rules

## UI Components
- Must be reusable
- Small and isolated
- Avoid large monolithic components

## Naming Convention
PascalCase for components

Example:
- SpeedCard.tsx
- PingChart.tsx
- ServerList.tsx

---

# Frontend Development Standards

## Use TypeScript Strict Mode
Always enabled.

## UI Design Rules
- Dark mode first
- Responsive layouts
- Minimal design
- Smooth transitions
- Gaming-inspired dashboard

## Performance Rules
- Avoid unnecessary renders
- Use lazy loading
- Use memoization where needed
- Optimize charts rendering

---

# Backend Architecture

/backend
/src
/network
/speedtest
/ping
/optimizer
/system
/database
/api
/utils

---

# Backend Responsibilities

## Speed Test Module
Responsibilities:
- Download speed testing
- Upload speed testing
- Bandwidth calculations

## Ping Module
Responsibilities:
- Latency testing
- Packet loss detection
- Jitter analysis

## Optimizer Module
Responsibilities:
- Server ranking
- AI recommendations
- Auto-switch logic

## System Module
Responsibilities:
- Windows adapter management
- WiFi signal monitoring
- DNS optimization
- Network interface control

---

# AI Engine Architecture

/ai-engine
/models
/training
/prediction
/analytics
/utils

---

# AI System Responsibilities

## AI Features
- Predict best server
- Learn network behavior
- Detect unstable connections
- Optimize based on activity

## AI Input Data
- Ping
- Download speed
- Upload speed
- Packet loss
- Jitter
- Time of day
- Historical performance

---

# Recommended APIs

# Internet Speed APIs

## Preferred
1. Ookla Speedtest CLI
2. Cloudflare Speed Test
3. Fast.com

---

# Windows Networking APIs

## Use:
- WLAN API
- WinRT APIs
- netsh commands

---

# Database Design

# Main Tables

## speed_tests
Stores:
- Download speed
- Upload speed
- Ping
- Timestamp

## servers
Stores:
- Server location
- Server latency
- Stability score

## ai_predictions
Stores:
- AI rankings
- Optimization scores
- Historical predictions

## user_preferences
Stores:
- User settings
- Modes
- Notification preferences

---

# Communication Framework

# Frontend ↔ Backend

Preferred:
- Tauri IPC
OR
- REST API

## Real-Time Updates
Use:
- WebSockets
OR
- Event emitters

---

# Security Framework

## Security Rules
- No external tracking
- Local-first data processing
- Secure API requests
- Encrypted local storage
- Minimum required permissions

---

# Performance Framework

## Performance Goals
- RAM usage under 200MB
- Fast startup
- Background optimization
- Low CPU usage

## Optimization Rules
- Use async operations
- Use worker threads
- Avoid blocking UI
- Cache repeated calculations

---

# Development Workflow

# Git Workflow

## Branch Structure
- main
- dev
- feature/*
- hotfix/*

---

# Commit Convention

Examples:
- feat: add ping analyzer
- fix: improve server selection
- refactor: optimize database queries

---

# Coding Standards

# General Rules

## Code Quality
- Write clean code
- Use comments only when needed
- Avoid duplicate logic
- Follow SOLID principles

## Error Handling
- Handle all API failures
- Retry failed network requests
- Prevent application crashes

---

# Frontend Rules

## React Rules
- Functional components only
- Hooks-based architecture
- Avoid prop drilling

## Tailwind Rules
- Use utility classes
- Avoid inline CSS
- Create reusable UI patterns

---

# Backend Rules

## Rust Rules
- Use async architecture
- Modular services
- Separate networking logic
- Proper thread management

---

# Logging Framework

# Logging Levels
- INFO
- WARNING
- ERROR
- DEBUG

## Store Logs For
- Speed tests
- Ping failures
- API failures
- AI decisions

---

# Testing Framework

## Frontend Testing
Use:
- Vitest
- React Testing Library

## Backend Testing
Use:
- Rust unit tests
- Integration tests

## End-to-End Testing
Use:
- Playwright

---

# Build Framework

# Frontend Build
Use:
- Vite

# Desktop Packaging
Use:
- Tauri Builder

# CI/CD
Recommended:
- GitHub Actions

---

# Deployment Framework

# Windows Packaging
Generate:
- .exe installer
- portable version

---

# Recommended Features

## Dashboard
- Live speed graphs
- Server analytics
- Ping monitor
- AI recommendations

## Optimization Modes
- Gaming Mode
- Streaming Mode
- Work Mode
- Smart Auto Mode

---

# Future Framework Expansion

## Future Integrations
- VPN support
- Router analytics
- ISP diagnostics
- DNS benchmarking
- Multi-device sync

---

# AI Agent Development Instructions

## Required Development Rules
- Prioritize performance
- Keep architecture modular
- Write scalable code
- Maintain clean folder structure
- Avoid unnecessary dependencies

## UX Rules
- Keep UI simple
- Prioritize readability
- Real-time feedback is required
- Minimize clicks

## Networking Rules
- Use efficient concurrent requests
- Prevent unnecessary speed tests
- Cache server results

---

# Recommended Final Stack

Frontend:
React + TypeScript + Tailwind + Tauri

Backend:
Rust

AI:
Python + Scikit-learn

Database:
SQLite

Charts:
Recharts

Testing:
Vitest + Playwright

CI/CD:
GitHub Actions

---

# Final Goal

Create a modern AI-powered Windows network optimization tool that intelligently improves internet experience with low latency, fast speed detection, and automatic server optimization while remaining lightweight and secure.
