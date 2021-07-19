CREATE TABLE "courses" (
  "id" varchar(100),
  "course_title" varchar(100),
  "course_level" varchar(100),
  "course_type" varchar(100),
  "course_desc" varchar(100),
  "course_tags" jsonb,
  "course_price" int,
  "created_at" timestamp,
  "updated_at" timestamp

);
