-- CreateTable
CREATE TABLE IF NOT EXISTS "public"."CredentialSubmission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CredentialSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CredentialSubmission_createdAt_idx" ON "public"."CredentialSubmission"("createdAt");
