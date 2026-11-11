export const TOOTH =
  "M12 3c3 0 6 1 6 5 0 3-1 5-1.5 8-.3 2-1 5-2.5 5s-1.5-4-2-5c-.5 1-.5 5-2 5s-2.2-3-2.5-5C7 13 6 11 6 8c0-4 3-5 6-5z";

export const serviceIcons: Record<string, string> = {
  cleaning: "M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3zm6 11l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14z",
  whitening: "M12 2v4m0 12v4M2 12h4m12 0h4M5 5l2.8 2.8m8.4 8.4L19 19M19 5l-2.8 2.8M7.8 16.2L5 19",
  implants: "M9 3h6l-1 6h-4L9 3zm1 6v4m4-4v4m-5 0h6l-1 8h-4l-1-8z",
  aligners: "M3 12h18M6 9v6m4-6v6m4-6v6m4-6v6",
  ortho: "M3 12h18M6 9v6m4-6v6m4-6v6m4-6v6",
  rootcanal: TOOTH,
  kids: "M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z",
};

export const iconFor = (id: string) => serviceIcons[id] ?? TOOTH;
