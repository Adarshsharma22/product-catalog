import prisma from "../lib/prisma.js";

export const getProducts = async (req, res) => {
  try {
    const {
      limit = 20,
      category,
      cursorUpdatedAt,
      cursorId,
    } = req.query;

    const take = Number(limit);

    const where = {};

    if (category) {
      where.category = category;
    }

    // First page
    if (!cursorUpdatedAt || !cursorId) {
      const products = await prisma.product.findMany({
        where,
        orderBy: [
          { updatedAt: "desc" },
          { id: "desc" },
        ],
        take,
      });

      const lastItem = products[products.length - 1];

      return res.json({
        products,
        nextCursor:
          lastItem
            ? {
                updatedAt: lastItem.updatedAt,
                id: lastItem.id,
              }
            : null,
      });
    }

    // Next pages
    const products = await prisma.product.findMany({
      where: {
        ...where,
        OR: [
          {
            updatedAt: {
              lt: new Date(cursorUpdatedAt),
            },
          },
          {
            updatedAt: new Date(cursorUpdatedAt),
            id: {
              lt: cursorId,
            },
          },
        ],
      },

      orderBy: [
        { updatedAt: "desc" },
        { id: "desc" },
      ],

      take,
    });

    const lastItem = products[products.length - 1];

    return res.json({
      products,
      nextCursor:
        lastItem
          ? {
              updatedAt: lastItem.updatedAt,
              id: lastItem.id,
            }
          : null,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStats = async (req, res) => {
  const total = await prisma.product.count();

  res.json({
    totalProducts: total,
  });
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};