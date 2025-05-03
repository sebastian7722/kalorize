CREATE TABLE "food" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"calories" integer,
	"totalProtein" numeric(5, 1),
	"totalCarbs" numeric(5, 1),
	"sugars" numeric(5, 1),
	"fiber" numeric(5, 1),
	"totalFat" numeric(5, 1),
	"saturatedFat" numeric(5, 1),
	"transFat" numeric(5, 1),
	"monounsaturatedFat" numeric(5, 1),
	"polyunsaturatedFat" numeric(5, 1),
	"cholesterol" numeric(5, 1),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
