import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}

export async function PUT(req:Request, { params }: { params: { id: string } }) {
  try {
      const { userId } = auth();
      const { id } = params;

      if(!userId){
          return NextResponse.json({error: "Unauthorized" }, {status: 401});
      }

      const { title, description, date, completed, important } = await req.json();

      if(!title || !description || !date){
          return NextResponse.json({error: "Missing required fields.", status: 400});
      }

      if (title.length < 3) {
          return NextResponse.json({
              error: "Title must be at least 3 characters long",
              status: 400,
          });
      }

      const task = await prisma.task.update({
          where: {
            id,
          },
          data: {
              title,
              description,
              date,
              isCompleted: completed,
              isImportant: important,
              userId,
          },
      });

      return NextResponse.json({message: "Task created", status: 201});

  } catch (error) {
      console.log('Error creating task: ',error);
      return NextResponse.json({Error: error, status: 500});
  }
}