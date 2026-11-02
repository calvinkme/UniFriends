export function levenshtein(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;
  const dp: number[][] = Array.from({ length: la + 1 }, (_, i) =>
    Array.from({ length: lb + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );

  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[la][lb];
}

export function fuzzyMatch(query: string, candidate: string, maxDistance = 2): boolean {
  const q = query.toLowerCase().trim();
  const c = candidate.toLowerCase().trim();

  if (c.includes(q)) return true;

  if (levenshtein(q, c) <= maxDistance) return true;

  const candidateWords = c.split(/\s+/);
  return candidateWords.some((word) => levenshtein(q, word) <= maxDistance);
}
