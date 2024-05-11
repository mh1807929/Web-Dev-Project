import * as seller from "@/prisma/repos/seller";

export async function GET(request) {
  console.log("request /api/seller");

  try {
    const data = request.json();
    return Response.json(await seller.get(data), { status: 200 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    return Response.json(seller.create(data), { status: 201 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const data = request;
    const { id } = params;
    return Response.json(seller.update(id, data), { status: 201 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    return Response.json(seller.remove(id), { status: 201 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}
