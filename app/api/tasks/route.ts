import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const { userId } = auth();
        if(!userId){
            return NextResponse.json({error: "Sign in to post task" }, {status: 401});
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

        const task = await prisma.task.create({
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

export async function GET(req:Request) {
    try {
        const { userId } = auth();

        if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const tasks = await prisma.task.findMany({
        where: {
            userId,
        },
        });

        return NextResponse.json(tasks);

    } catch (error) {
        console.log('Error getting task: ',error);
        return NextResponse.json({Error: error, status: 500});
    }
}

export async function PUT(req:Request) {
    try {
        const { userId } = auth();
        const { isCompleted, id } = await req.json();

        if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const task = await prisma.task.update({
        where: {
            id,
        },
        data: {
            isCompleted,
        },
        });

        return NextResponse.json({message: "Task Updated"}, {status: 201});
    } catch (error) {
        console.log('Error updating task: ',error);
        return NextResponse.json({Error: error, status: 500});
    }
}

export async function DELETE(req:Request) {
    try {
        
    } catch (error) {
        console.log('Error deleting task: ',error);
        return NextResponse.json({Error: error, status: 500});
    }
}