#!/usr/bin/env python3
"""Keep the live closure-based restaurant and science games in sync with maintained sources."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
for filename, key in [('english-premium-v3-source.js', 'ENGLISH_PREMIUM_V3'),
                      ('island-v2-source.js', 'ISLAND_V2')]:
    start, end = '/* ' + key + '_START */', '/* ' + key + '_END */'
    assert html.count(start) == html.count(end) == 1, key
    a, b = html.index(start), html.index(end) + len(end)
    source = (root / 'assets' / filename).read_text(encoding='utf-8').strip()
    html = html[:a] + start + '\n' + source + '\n' + end + html[b:]
page.write_text(html, encoding='utf-8')
print('Restaurant and science sources synchronized.')
