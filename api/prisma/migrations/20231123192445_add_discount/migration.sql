-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "rule" JSONB NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discounts_key_key" ON "discounts"("key");
