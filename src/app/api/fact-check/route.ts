
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handles anonymous fact-check requests.
export async function POST(req: NextRequest) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { articleId, reason } = body;

    // Validate input
    if (
      typeof articleId !== "string" ||
      !articleId.trim() ||
      typeof reason !== "string" ||
      reason.trim().length < 10 ||
      reason.trim().length > 2000
    ) {
      return NextResponse.json(
        {
          error:
            "A valid article ID and a reason between 10 and 2000 characters are required.",
        },
        { status: 400 }
      );
    }

    // Check whether the article exists
    const article = await prisma.article.findUnique({
      where: {
        id: articleId.trim(),
      },
      select: {
        id: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    // Create fact-check request
    const factCheck = await prisma.factCheck.create({
      data: {
        articleId: article.id,
        reason: reason.trim(),
        requestedBy: "anonymous",
      },
    });

    return NextResponse.json(
      {
        message: "Fact-check request submitted successfully.",
        factCheck,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Fact-check API error:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
