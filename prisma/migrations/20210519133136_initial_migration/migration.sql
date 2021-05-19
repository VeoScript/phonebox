-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "birthday" TEXT,
    "anniversary" TEXT,
    "relationship" TEXT,
    "avatar_url" TEXT,
    "slug" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact.phone_unique" ON "Contact"("phone");
