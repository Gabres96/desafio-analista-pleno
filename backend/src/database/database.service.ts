import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: Pool;

  onModuleInit(): void {
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async query<T extends QueryResultRow>(
    sql: string,
    params?: unknown[],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(sql, params);
  }
}
