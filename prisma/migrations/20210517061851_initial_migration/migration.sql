-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "avatar_url" TEXT,
    "slug" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact.phone_unique" ON "Contact"("phone");
