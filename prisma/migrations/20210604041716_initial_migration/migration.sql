-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
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
    "youtube" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "title" TEXT,
    "slug" TEXT,
    "note" TEXT,
    "date" TEXT,
    "tag" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact.phone_unique" ON "Contact"("phone");
