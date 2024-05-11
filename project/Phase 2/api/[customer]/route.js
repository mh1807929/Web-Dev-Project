import * as customer from "@/prisma/repos/customer";

export async function GET(request) {
  console.log("request /api/item");

  try {
    const data = request.json();
    return Response.json(await customer.get(data), { status: 200 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    return Response.json(customer.create(data), { status: 201 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const data = request;
    const { id } = params;
    return Response.json(customer.update(id, data), { status: 201 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    return Response.json(customer.remove(id), { status: 201 });
  } catch (error) {
    console.error(error.message);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}
