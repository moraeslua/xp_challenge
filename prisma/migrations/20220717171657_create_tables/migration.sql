-- CreateEnum
CREATE TYPE "InvestmentEventType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "AccountEventType" AS ENUM ('WITHDRAW', 'DEPOSIT');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "exchange" TEXT NOT NULL,
    "exchangeShortName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "accountId" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("accountId","assetId")
);

-- CreateTable
CREATE TABLE "InvestmentEvents" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "InvestmentEventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestmentEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountEvents" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "AccountEventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "AccountEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentEvents" ADD CONSTRAINT "InvestmentEvents_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentEvents" ADD CONSTRAINT "InvestmentEvents_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountEvents" ADD CONSTRAINT "AccountEvents_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
