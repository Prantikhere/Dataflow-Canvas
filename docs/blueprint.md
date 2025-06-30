# **App Name**: Dataflow Canvas

## Core Features:

- NL-Driven ETL Definition: Use natural language processing (NLP) to interpret user input and convert it into ETL job definitions. Use an LLM as a tool to generate job configurations based on input. Store job components such as table and column names.
- Visual Workflow Builder: Provide a visual drag-and-drop interface for users to construct and modify ETL workflows. Feature metadata browsing and visual configuration.
- ETL Metadata Management: The app should extract configuration of source and target table names, transformation rules and other settings necessary for ETL workflow into reusable, well-defined and modular components.
- Automated Job Execution: Generate, schedule, and monitor ETL jobs using stored metadata, with basic status reporting to provide insights into job performance and error handling.
- History and rollback: The system stores history about job configuration and definitions to permit rollbacks and to aid with reproducibility.

## Style Guidelines:

- Primary color: Deep charcoal (#232F3E) for a professional, data-centric feel.
- Background color: Light grey (#F2F3F3) to ensure readability and a clean interface.
- Accent color: Vibrant orange (#FF9900) for calls to action and highlighting key elements.
- Body and headline font: 'Inter' (sans-serif) to maintain clarity and consistency across all text elements. Note: currently only Google Fonts are supported.
- Dashboard layout featuring a left sidebar for metadata browsing, a central canvas for workflow visualization, and a right panel for detailed job information. 16px spacing will be consistently applied to maintain a balanced, modern card-based UI with clear data hierarchy.
- Use icons that clearly represent data processing actions and data sources/targets. Use filled icons, styled with the primary and accent colors, for interactivity and emphasis.
- Use subtle animations on data transition and task completion to signal status and guide the user through the ETL process.