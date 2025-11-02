export async function mockRemove(url: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (!/^https?:\/\//.test(url)) {
    throw new Error("Invalid URL");
  }
  return { downloadUrl: "#mock-file.mp4" };
}
