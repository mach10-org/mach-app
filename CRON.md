# CRON

## Send schedule reminder email

```sql
select
  cron.schedule(
    'send-scheduler-reminder-email',
    '*/5 * * * *', -- every 5 minutes
    $$
    select
      net.http_post(
          url:='https://REPLACE_PROJECT_REF.supabase.co/functions/v1/schedule-reminder',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer REPLACE_SERVICE_KEY"}'::jsonb,
          body:=concat('{"time": "', (now() at time zone 'utc'), '"}')::jsonb
      ) as request_id;
    $$
  );
```

## Send missed sessions email

```sql
select
  cron.schedule(
    'send-missed-sessions-email',
    '0 3 * * 1', -- at 3AM on Mondays
    $$
    select
      net.http_post(
          url:='https://REPLACE_PROJECT_REF.supabase.co/functions/v1/missed-sessions',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer REPLACE_SERVICE_KEY"}'::jsonb,
          body:=concat('{"time": "', (now() at time zone 'utc'), '"}')::jsonb
      ) as request_id;
    $$
  );
```

## Send missed session email

```sql
select
  cron.schedule(
    'send-missed-session-email',
    '*/5 * * * *', -- every 5 minutes
    $$
    select
      net.http_post(
          url:='https://REPLACE_PROJECT_REF.supabase.co/functions/v1/missed-session',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer REPLACE_SERVICE_KEY"}'::jsonb,
          body:=concat('{"time": "', (now() at time zone 'utc'), '"}')::jsonb
      ) as request_id;
    $$
  );
```