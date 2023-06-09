import { NextRequest, NextResponse } from "next/server";

// run only on homepage
export const config = {
  matcher: ["/"],
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const latitude = geo.latitude || "49.2820";
  const longitude = geo.longitude || "-123.1171";

  url.searchParams.set("latitude", latitude); 
  url.searchParams.set("longitude", longitude);

  return NextResponse.rewrite(url);
}
