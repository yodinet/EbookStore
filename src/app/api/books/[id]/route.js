import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();



export const DELETE = async (req, {params}) => {
  const { id } = params;
  try {
    const book = await prisma.books.delete({
      where: {
        id: Number(id),
      },
    });
    
    return NextResponse.json({
      success: true,
      books: book,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};



export const PUT = async (req, {params}) => {
  const { id } = params;
  const body = await req.json();
  try {
    const book = await prisma.books.update({
      where: {
        id: Number(id),   
      },
      data: body,
    });
    
    return NextResponse.json({
      success: true,
      books: book,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};