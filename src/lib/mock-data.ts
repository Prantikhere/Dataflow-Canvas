import type { EtlJob, Metadata } from './types';
import { Archive, Cog, Database, Filter, GitMerge, Group, Table } from 'lucide-react';

export const MOCK_METADATA: Metadata = {
  sources: [
    { name: 'PostgreSQL DB', icon: Database, description: 'Connect to a PostgreSQL database.' },
    { name: 'CSV File', icon: Table, description: 'Import data from a CSV file.' },
    { name: 'S3 Bucket', icon: Archive, description: 'Pull data from an AWS S3 bucket.' },
  ],
  transformations: [
    { name: 'Filter Rows', icon: Filter, description: 'Filter data based on a condition.' },
    { name: 'Group By', icon: Group, description: 'Group rows by a specific column.' },
    { name: 'Join Tables', icon: GitMerge, description: 'Join with another data source.' },
    { name: 'Custom Logic', icon: Cog, description: 'Apply custom transformation logic.' },
  ],
  sinks: [
    { name: 'BigQuery Table', icon: Database, description: 'Load data into a BigQuery table.' },
    { name: 'CSV File', icon: Table, description: 'Save data to a CSV file.' },
    { name: 'Data Warehouse', icon: Archive, description: 'Load data into a data warehouse.' },
  ],
};

export const MOCK_JOB: EtlJob = {
  id: 'job-001',
  name: 'Process User Data',
  description: 'Extracts user data, filters for active users, and loads into a marketing table.',
  steps: [
    {
      id: 'step-1',
      name: 'User Database',
      type: 'source',
      description: 'Source from production DB',
      details: {
        table: 'users',
        database: 'prod_db_1',
      },
    },
    {
      id: 'step-2',
      name: 'Filter Active Users',
      type: 'transform',
      description: 'Keep only active users',
      details: {
        condition: "status = 'active'",
      },
    },
    {
      id: 'step-3',
      name: 'Enrich with Profile Data',
      type: 'transform',
      description: 'Join with user_profiles',
      details: {
        join_type: 'LEFT JOIN',
        join_table: 'user_profiles',
        on: 'users.id = user_profiles.user_id'
      },
    },
    {
      id: 'step-4',
      name: 'Marketing Table',
      type: 'sink',
      description: 'Load to marketing warehouse',
      details: {
        table: 'active_users_enriched',
        database: 'marketing_wh',
      },
    },
  ],
  history: [
    {
      id: 'hist-1',
      version: 1,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Success',
      author: 'Admin',
      changes: 'Initial job creation.',
    },
    {
      id: 'hist-2',
      version: 2,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Success',
      author: 'Jane Doe',
      changes: 'Added enrichment step with profile data.',
    },
    {
      id: 'hist-3',
      version: 3,
      timestamp: new Date().toISOString(),
      status: 'Failed',
      author: 'AI Assistant',
      changes: 'Attempted to add a duplicate filter step.',
    },
  ],
};
