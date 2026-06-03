import { useState, useEffect, useMemo } from "react";

// ─── helpers ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "affordbuy_v1";
const LOGO_SRC = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAEIAwoDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAcIBQYJBAMCAf/EAFwQAAEDAwICBQUICQ8KBgMBAAEAAgMEBQYHERIhCDFBUWETFCJxgQkyN3WRobGzFRZCUnSUssHRFxgjMzY4U1VWYnJzgpLCNENUdpOVorTS0yQ1RFdj4SWD8KP/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EADgRAAICAgECAwUGBQIHAAAAAAABAgMEERIhMQVBURMUInGBBjJhkaGxM0JSwdHh8BUkNFNyovH/2gAMAwEAAhEDEQA/ALloiIAiIgCIq79LrXaLAbTJi2NVDH5JVx7Pe07+ZsP3R/nHsHtV663ZLigWHa5r2hzXBzT1EHcFf1Ud6JnSMnstZDhmd1z5rdO/ho6+V25gcT715+9J7exXghkjmibLE9r43gOa5p3BB7QrW0yqlpkJ7P0iIsRIREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREARFiMyyK24njFfkN3mEVHQwmWQ9p26gPEnkiW+gI+6TWrVHpbg8k0Esb77XNMdvgPMg9shHcPpXNW93S4Xq7VN1ulVJVVlTIZJpZHbuc4radZ9QrtqVnNZkNzkcI3OLKSDf0YYgfRaPzrSl28aj2Uevcxt7Cth0ROkQ+zS0uC5xWF9ueRHb66V25gPZG8/e9x7FU9FktqjZHiwno7GRvZJG2SNwexw3a4HcEL9KlXRC6Q7qF9LgecVhdTOIjt1fK79rPZG8ns7irqMc17A9jg5rhuCDyIXFtqlVLTLp7P6iIsRIREQBERAEReOqulspTtVXGjgI/hJmt+koD2IsLJluLxnZ+Q2tp8apn6V9YMkx6cgRXy2vJ6tqpn6VOmDKovxDNDMzjhlZI3vY4EfMv2oAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAVIuntqoLldotOrNU70tE4S3JzDyfL2M/s9virUa35tT6faaXbJJXtE0UJZStP3czuTR8vP2Llfdq+qulzqbjWyumqamV0sr3HcucTuSt/Cp5Pm/IrJnmREXUKBERAASCCDsR1FXE6IPSH4DS4FnNb6J2jt1fK75I3k/MVTtf1pLXBzSQQdwR2LHbVG2OmSno7GNIc0OaQQeYIX9VP+iF0iROKXAs6rdphtHbrhK73/AHRvPf3FXABBAIO4PUVxLapVy0y6ewi8t2uNDabdNcblVw0lJA0vkllcGtaB3kqm2vfS0qqiWqsGm7fIQAmN91kG7njqPk29nrKmqmVr1EN6LR6i6l4XgFC6pya+U1K7bdkAdxSv8A0c1WLUbpnVDnSUuCY+1jeYFXcOZ9YYPzlVJu9zuN3r5K+6V1RW1Uh3fLPIXuJ9ZXkXSrwoR+91KuRJWYa66p5Q5wuGW1sER6oaR3kWj1cPP51oFwulzuLuK4XGsq3de88znn5yvIi2owjHsiAv6xzmODmOLXDmCDsQv4isQbFY86zOyTMltWU3elLDu0Mq38I/sk7fMpfwjpZ6nWOSNl4ko79TN2DhUR8EhH9Jv6FX5FjlVCfdE7OiOmHSp08yx8VHd5Jcdr37Dhq/2px8Hjl8qneiq6WtpmVNHURVELxu2SNwc0j1hcd1Iukesub6a17JLNcpKig3HlKCocXQvHgPufYtO3BXeDJUjqSiifQbXPFtVKHyNO8W+9xNBnoJnDiPe5h+6Clhc6UHB6kXCIiqAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIi8GR3Wmsdgr7xWODaeip3zyEnbk1pOydwUm90B1BN2y+jwWhmJpLU3ytUAeTp3DkD6h9JVWVmc4vtTk2X3W/1by+auqnzOJPeeXzLDLv01+zgomNvYREWQgIiIAiIgP6xzmODmuLXA7gg7EFXO6KHSOMtrdiWdSzyy0NO6SlrmsL3PjYNyx+3aAOR7VTi2UNXc7jT2+hgfPVVEgjijYNy5xOwAXRzox6IWvTPGW1dyhiq8iroh53M5oIiaR+1N8O/vWpmSgoal3LRKidJPXa9an3eS30T5qDGoHkQUoOxm2+7k7z4dihZW16XfR2da31Wd4NRl1C4mS4UETdzCe17B973jsVSjyOxWXHlBwXAhhERZiAiIgCIiAIiIAiIgPXZ7ncLPcobla6yajrIHB0U0TuFzT61fjop9IOmz+lixfKZY6bJYWbRyHk2saO0dzu8Ln4vRbK6stlwguFvqZaarp3iSGWN2zmOHUQVhuojbHT7kp6OwyKDuijrVBqbjP2Mu8sceS0DAKhnV5dnZI0fSFOK4k4OEuLMgREVQEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAUA9OvLX47ow+108vBUXqoFNyOx8mPSf/hU/KiPuh2Tef6j2rGon7x2ujEkjd+qSTn+TstjFhytRD7FX0RF2zGEREAREQBEWx6Z4pWZtnVpxmha4yVtQ1j3Ae8Z1ud7BuobSW2C0HQK0mZKZNSb7SBzWkxWpkjeW/wB1KPoHtVy1jcXs1Fj2PUNkt0LYqWigbDG1o2GwGyyS4V1rsm5MyJaP5Ixkkbo5GNexwIc1w3BB6wQqQdLzo8OsctTnWEUbnWx5L6+hjG5pyet7R954divAvxNFHPC+GaNskb2lr2OG4cD1ghKbpVS2g1s46IrR9Lno9SYzUVGbYZSOks0ji+spIxuaVx63AfefQquLt12RsjyiUa0ERFcgIiIAiIgCIiAIiIDYNPMtu2EZfQZJZp3RVNJIHEA8pGfdMPgQup+neVW7NMNtuS2uQPp62Fr9gebHbc2nxBXJBWz9z+1INDeqzTy5VG1PWb1Fv4jybIPfsHrHP5VpZtPKPJd0Wiy7aIi5JcIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAuWvSTuz71rlllaZC9guEkUZJ+4adgPkC6iV9Syjoairk95BE6R3qaCT9C5E5TVvr8ludbI7idNVyvJ793FdDAXxNlZGNREXTKBERAEREAVtvc7cO85vl6zaph3ZSsFHSuI+7dzeR7OFVJXSzocY19rmg1k44+Ge4NdWyb9Z4zuN/UNlq5k+NevUtHuTEiIuMXCIiA+dTBDU08lPURMlhkaWvY8btcD1ghUO6W3R8mw+qnzLEKZ8tgmfxVNOwbmjce3+h9CvqvlWU1PWUktJVwxzwTMLJI3t3a5p6wQs1N0qpbRDWzjsisj0suj5UYRWTZbidPJNjk7y6aFo3dROP+DuPYq3LtV2RsjyiUa0ERFcgIiIAiIgCIiALMYTfajGcutWQUriJaCqZONu0A8x7RuPasOiNbWgdf8culPe7BQXekeHwVlOyZjh1EOG696hHoTZJ9sGhFsgkkL57XI+jfud9g0+j/AMOym5efsjwk4mUIiKgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgMDqPL5DT3I5t9uC1VLh7InLkhI4vkc89biSurmts/m+kWVS77bWucfK0j865RLp4C+GRSQREXQKhERAEREB9KSB9TVRU0Q3kleGNHiTsF1zwugjteI2i3RDZlPRxRgepoXKHBIfOM4sMG2/lLlTs+WVoXXGmZ5Onjj+9YB8gXO8Qf3UXifRERc0sEREAREQHxrqSmrqOajrII6inmYWSxSN3a9p6wQqB9K/o/VOB102VYtBJPjc795I2jd1G49h/m9xXQJfC4UdLcKGahrqeOopp2GOWKRu7XtPWCFmpulVLaIa2ceEVh+lboBVaf3CXJ8ZgkqMZqH7uaBu6jcfuXfze4qvC7VdkbI8olGtBERXICIiAIiIAiIgLo+5vXbitWV2Mu/a54qoDu4m8P+FW9VIPc35OHMcrj+/oYD8j3q764uWtWsyR7BERaxIREQBERAF+TJGDsZGA9xK/FXOympZaiQgMiYXuPgBuqkZBkNyuN7ra5tfVNbNM5zQ2VwAG/Lt7l1vCvCpeIOWpaSKTnxLc+Wi/hWf3gvx51Tf6TD/fCqJaJ7tcbpS0MVfWF88rWACZ3afWoq6X1rvuD6uTQUV4ucNBXU0dRAGVTw3fYNcAN+8b+1Z87wVYkowdm29+Xp9SIz2dEPOqb/SYf74X2BBAIO4PUVyG+2XI/wCP7r+OSfpXSXoqZc7MdErJXTzGarpWGjqXOduS9nLc+whcy/FdUd72XT2SoiItUk8GQ3m149Zaq83quhobfSRmSeeV2zWNH/8AdXaqnajdNCngqZaTAsbFWxvJtdcnFjXHvETeZHrc0+Cwnuh+eVNTklr09pJnNo6OBtfWtaSPKTP3DGnv4Wjf+34Kpi6WNixceUyrZYebphatSO3bBjcQ7mUUm3zyFfP9d9q33Y/+JO/61EFgwDOcgpG1diw+/XOncNxLSUEsrTz262tI61k/1IdVf/bjLf8AdE//AErZ9lQvJFdsu10OdWcr1UtuSVGU+Ycdump2QClhMY2eJC7fdx396FL+eZfj+D41UZDktwjoaCAbFzubnuPUxrRzc49wVfegDieUYrZ8ujybHrrZn1FRSmFtdSPhMga2Tct4gN9tx1d6hPp1Z3U5Nq/NjUUzvsXjrRTxsBIa6dzQ6V5HeCQz+z4rR9hGy9xj2Lb0jfM+6adeaqWnwfFqdkDXbR1V0eXF436/JMI2/vLR5emDq0924ix1g7m0T9vnkVeVtdp011Du9GysteDZHXUzwHNlp7bK9jgeYIIbst73emC6ortksfrvtW+7H/xJ3/WrX9E/UHINS9MJciyTzTz1tylph5tEWM4GsjI5Ennu49qoJ+pDqr/7cZb/ALon/wClXh6DuP33GtGJrdkNmr7RWG7zyCCtp3QyFhZGA7hcAdjsefgtbKhUq9x1sstk7IiLmlgiIgCIiAIiIAiIgCIiAIiIAiIgC/L3sYN3va0d5Oy/ShvpnVNTR9Hy+VNJUS087JafgkieWObvK0ciOY5K0I8pKPqCX/OKf+Hi/vhfuOSOTfycjX7dfCd1yK+2jJv5RXf8dk/Srse55XCvuOA5HNcK2prJG3QNa+eV0jgPJMO25PVzK2rsR1Q5bKqWyzXnFP8Aw8X98J5xT/w8X98LlfqfkeQwalZRBBfrpFFHeKtjGMq5A1rRM8AAA8gFrv20ZN/KK7/jsn6VkWA2t8hyOuXnFP8Aw8X98J5xT/w8X98Lkb9tGTfyiu/47J+lPtoyb+UV3/HZP0qf+Hv+ocjrqySN/vJGu9R3X6XI6mzLLqZ7XwZRe43NO44a+Uc/7ylbTHpP6k4nWxMutw+2G28Q8pBV7cYby34HjqO3fuqSwJpdHscjo2i1vTTNbFqBiFHk2P1AlpalvpMJHHC8e+jeOxwK2RaTTT0ywREUAIiIAiIgCIiAIiIAiIgCIiAIiIDUNaoPOdJMqh233tc5+RhP5lygXXHUOHzjAMigA3MlrqWgeuJy5IStLJXsPW1xC6eA/hkUkflERdAqEREAREQGYwebzfNbFUb7eSuNO/5JGldcqV/lKWKT75gPyhceIJXwTxzRnhfG4Oae4g7hdcMCuTLvhNlucZ3bU0MUgPraFzvEF91l4mbREXNLBERAEREAREQHnudDR3O3z2+4U0dTS1DDHLFI3dr2nrBC58dKrQOs06ukmQ49DJU4xUvJGw3dSOP3DvDuK6HryXm20F4tdRbLnSx1VHUsMcsUjd2uaVmoulVLa7ENbOPiKdulLoRX6a3h96ssUlVjNVITG8Dc0zj9w/w7ioJXbhNTjyiUa0ERFYgIiIAiIgLYe5vR8WX5ZLt7yigHyvervKo/ucFp4Mfym+FuxlqY6YHvDW8X+JW4XFy3u1mRdgiItYkIiIAiIgNJ1rvH2JwGs4H8M1VtAzv59fzKr6l7pKXjy13oLLG7dtOwzSD+c7kPm3UQr6L9ncb2OGpPvLr/AINa17kSHoDZ/slnLKt7d4qGMynl911N+dY33Q7E/P8ABbTlkEW8tsqfIzOA6o5Or/i2UqdHO0eZ4pPc5GbSVsvok/eN5fSti1mxmPL9L7/j72guqaN/kz3PA3aR47heZ8ZzOfiDa7R6f5MsI/CcoFb/ANzoyzydff8ADZ5eUzG1tO0ntbycB7Dv7FUOphkp6iSnmaWSxPLHtPYQdiFIPRvys4drNj13dJwU7qkU9Qd/83J6J+lVvhzraC7nUpYO+ZjidjrfMb1ktot1VwB/kaqsjjfwnqOziDtyKzgIIBB3B6iufPugvw8QfEtP+XKuRRUrZ8WXb0af0urzR37pB5LcLdWwVtETTRwTQyB7HNbTRA8LhyI4uJRzi1JS1+T2qhrZGxUtRWwxTPc7hDWOeA4knq5E81jUXbjHjFRRQ6u0Of6aUNHDR0WYYxT00DBHFFHcIWtY0DYAAO5Bfb9UnT3+XGOf7yi/6lycRaXuEf6ieR1gj1P04kkfGzO8bc+PbjAuUXLf+0uZestxju2rmYXKGZs8NTe6ySKRrt2uYZn8JB7RtstTRZqMZUttMhvZvGgVJZqzWXFochlporU2vZNUuqXtbFwxgv2eXcuEloB3699l0qbqPp21oa3Nsba0DYAXGIAD+8uTqJfjK5pthPR1j/VJ09/lxjn+8ov+pZuw3uzX6jdWWS60VypmSGN0tLO2VgeACWktJG+xB28QuQK6Ce5+OazQWpe9wa1t6qCSTsAPJxLSvxVVDkmWT2WKWNvV/sdkiMl3u9DQNA3/AGedrDt6iVU/pJ9KaWkranFtN5gJIHmOpuu243HWIv8AqVRcgv8AesgrX1t6ulXX1Dzu588pcfnSrClNbl0DkdMrhrxpFQlzZ86tRe3raxznH5gv7b9eNIq5zWwZ1auN3INe5zT84XLpFse4Q9WRyOvllv8AY71GH2i70NcCNx5Cdrzt6gVklyDx+/3rH6+Ousl0q6CojO7XwSFpBVvOjZ0pqi4XOlxXUaRpkqHiKlugGw4j1CQeP3y17cKUFuPUlSLgLB3fL8Ws9a6iuuQW2hqWgOMU9Q1jtj1HY9izbSHNDmkEEbgjtXPTp9/D2fimn/KkWHHqVs+LZLei8o1DwUnYZdZSfwxn6VssT2SxNkjcHMeA5pHaD1LjxR/5XD/WN+lXJ6SXSWrMe8nhWATxCsgp2Mr7kPS8k/hG8cfZxDtPYfUs9mE00oveyFIttcLlbrc0OuFfS0jT1GeZrAflKws+e4TA/glyyytd3eexn6CuVV8yS/3yodUXi819dI7rM07nfNvssUsi8P8AWQ5HYO0XS3XiibW2utgrKZxIbLC8OYSOvYhemaWOGN0s0jI2NG7nOOwHtVbej7ntj046INqya+yHyMMlQ2KFhHlJ5DM7ZjR3/QASqs6xa7ZzqNcagVFymttoe4+St1NIWsa3sDiObj61rwxZTk0uyJ2dBch1X03x+QxXfM7NTSfeGpBPzLXm9IjR50/kvt0oQfvjvw/KuY6LbWBDzZXkdZsV1DwfKQftfym1XAjrbFUN3+RR902f3ul//rKf65q5vU089NO2emmkhlYd2vjcWuB8CFLs2umRXvRm96e5XUy3Ly4hfQVj+cjCyRpLHHtGwJB8PFU9ycJqUXvqTyIeV5vc4vg8yX42H1LFRlXm9zi+DzJfjYfUsWfM/hMiPcp9qt8KOWfHVZ9e9YjHrZNer/brNTOYyevqoqaNz+oOe8NBPhuVl9VvhRyz46rPr3ppT8KOJ/HVH9exZ09QIJq/Wd6m/wCm2b/bp+s71N/02zf7dX/Rcr320txRy/1X0L1C02oRcr7bGy2zcNdWUrxJGwk7AO297v2bqMV1h1mprfV6SZbBdGsdRmzVRl4hyG0TiD6wQCPEBcnlv4tzti9+RDWiz3uemYVNt1JuGHSyk0V4pHTxx9gqItjuPWzj39QV6bhWUtvopa2tnjp6aFvFJLIdmsHeT2Bc4uhDHI/pJ445m/DHFWOk9Xmso+khXo6Q3wGZr8S1P1ZWlmRXtkvUmPYyn6oeCfyusv44z9KyViybHr7NJDZrzQ3CSJvFI2nmDy0HqJ26lyHVuPc2v3QZn+C0v5UqtdhquDlsKRdZERaBYLXq/N8Pt9ZLRV2TWqmqYXFkkUtS1rmEdhBPJbCuX3So/fB5l8YH8lq2MelXSabIb0dHqTO8Lq6qGlpcptE08z2xxRsqmFz3E7AAb8ySV+a3P8KoquWkrMotVPUROLZIpKlrXNPcQepcxdEvhmwj/WKg/wCYjUodOzFfsBrTLdIo+GnvNO2pBA5F49F/zhZ3hxU1Dfcjl0Lzwah4LPMyGHLLPJJI4NY1tU0lxJ2AHNbQuO1HUS0lXDVQO4ZYZGyMd3OB3B+ULrFpRkUWWacWHIInBwrKKN7ufU7bY/OFiycb2KTTJT2bOiItUk/Mj2RxukkcGsaCXOJ5ALFfbPjv8dUP+2Cwmst3+xGA1z2u4ZagCCPv3d1/Mqtr0PhPgizqnZKWuukY52cXouNRXyz1tQKejuVLPKRuGRyBxWQUG9Gm0cdbcb1I3lG0QRnxPM/MpyXN8SxYYmQ6YS3otF7Wz5VcDKmlmppBuyVjmO9RGxXIvMKJ9uyu60MjeF0FZKwju2cV15XLvpP2aSx675VSPjMbJK11REP5j/Sb8xU4EviaEiNURF0ygREQBERAF0i6FWTDItCbVBI/intbnUUg33IDT6P/AA7Lm6rT+55ZgLfml2w+pmDYrlCKinaT/nWcjt4kEfItXMhyr36Fo9y86Ii4xcIiIAiIgCIiAIiIDw36026+2iptN2pIquiqYzHLFINw4Fc7ek/oXctML2652yOWrxmrkPkJ9tzAT/m3/mPaukCx+R2W15FZaqzXmjirKGqjMcsUg3BB+g+Kz0XuqX4ENbOQKKaOk1obdNLb46uoGS1eNVTz5tUbbmEn/Nv7j3HtULrtQmprkjGERFYBEWwab45Plud2bHadhc6uq2Ru2HUzfdx/ugqG9LbB0M6HOM/a3oRZBJEWVFwDq2XcbE8Z3bv6hsFMS8tooYLZa6W30zAyGmibExoHIBo2XqXn5y5ScjKERFUBERAF/HuaxjnuOzWjcnwX9Ws6oXf7C4PcqxruGQx+Tj/pO5BZaanbZGuPdvRDeituoF2deswuVwJ3a+YtZ4NHIfQsLTQvqKiOCMbvkeGt9ZOy+Z5ncrc9GbP9l89oWubxRUxM8nds3qHyr6nZKGJjt+UV+yNRdWWRxa2ss+O0FtY3h8hC1pHjtz+fdZIgEbHmERfKZzc5OT7s3DmD0psU+1DW6/0EcfBTVM3nlPy62Sc/p4lGMUj4pWSxuLXscHNI7COpXI90YxPeHH8ygi96XUVQ4DsPpNJ+Qj2qmq7ePPnWmY33OquguUMzDSTHr4Hh0slI2ObvEjBwnfx5b+1azq/0ecH1QytuS5DXX2CsbSspg2iqI2R8DS4g7Ojcd/SPaot9zryzzrGL5h88m76KYVcDSfuH8nfPsrYrk2cqbHx6F11Ryo14xO24Nq3f8Us8tVLQW+ZjIX1Lw6QgxMceItAB5uPYFgMItlPe80sdmq3SNp6+409LK6MgPDHyNaSCQQDsT2Fb/wBLz98dmH4TF9RGtN0o+FLE/juj+vYuxBt1p/gU8y7P6zTSr+Nct/HYP+yn6zTSr+Nct/HYP+yrIIuN7xb/AFF9IrcOhlpWCSbvlx37DWQcv/8AFUaze2U9kzS+WakdI6noLjUUsTpCC8sZI5oJIABOwHYF12XJbVf4Uss+O6z6963cK2c2+T2VkjJaD4nbc51bsGKXiWqioLhM9kz6Z4bIAInuHCXAgc2jsKuP+s00q/jXLfx2D/sqrHRD/fHYf+Ey/USLpuozLZwmlF+RMUVv/WaaVfxrlv47B/2VrnSCFo6P2hP6n+GV1ydNfquSTytVK10sbC1okIc1rQAQ0Acu9WzVAPdBbxPWay01pe/eG326Pgb3GT0isWPKdtiUntB9EVwJJJJO5K3bSfS7L9TLs6ixm3mSKIjy9VIeGGHf753f4LTKeJ9RURwRDd8jwxo7yTsF1Q0Iwa2YBpta7Nb4GslfAyark29KWVzQST8uy3cm/wBlHp3ZVLZXbH+hPCaZhv2aStmIHE2jpxwjw9JMg6E8IpXusOaSunA9FtZTjhPh6KuIi53vdu+5fSOUequmeWabXr7G5LQGNrv2mpj9KKYfzXfmWnNJa4OaSCDuCOxdU9dsKtud6aXe0V1OySVtM+WlkI9KOVoJBB9my5XTxPgnkhkGz43Frh3EHYro41/tY9e6KNaOhXQi1KnzXTp9juk75rrZCInSPO7pIT7wk+HUq6dPv4ez8U0/5Ui9/ufF1lpNY6u1tftHXW6QvHfwEEfSvB0+/h7PxTT/AJUiwwgoZL16EvsV9HI7hZCyWm7ZHeobbaqOouFwqn7MjjaXPe49Z/SVj10R6Gek9DhWn9Jk9dTRyX+9QNnMrm+lBA4bsjb3bjYn17LZvuVUdkJbIcwHoZX6up46nMMhhtfEATT0rPKSN9bjy3Uj0nQ009iiDZ71ep3/AH3E1vzBWZX5keGRue7qaCSuVLKtl5l9I5m9Jaoo7LlEWmlgrKmWw4txwRCV+/FO5xfK47doJ4f7KiVZLKbjUXjJbndat3FUVdXLNKe9znEn6VuXRwwynz3WKx4/XNLqF0jp6sDtjjaXEe0gN9q661XDb8inc2bRPo45tqRSR3dwZZbK/wB5VVTTvMO9jesjx6lOdJ0J8ebABVZtcnykcyykYAD4ekrWUlPBSUsVLTRMhghYGRxsGzWtA2AA7l9Vyp5lkn0ei/FFHs+6GWQUFO+pxDIYLtwNJ83qmeRkdy6gRu351WHILPdLBeKm0Xmhnoa6meWTQTN4XNI8F1/VUvdCsFoqnEbdnlLTtZX0dS2kq3tGxkieDwl3fwkbf2lnxsuUpKMyGijyvN7nF8HmS/Gw+pYqMq83ucXweZL8bD6li2Mz+EyI9yn2q3wo5Z8dVn171jMUun2Dyi03vyXlvsfWw1Xk99uPybw7bfx2WT1W+FHLPjqs+vetaWxFbiipcH9e1VfyFh/HD+hP17VV/IWH8cP6FT5Fh90q9CdssFrV0o8n1CxKoxeks9NZKCrAbVujlMkkrNweDcgcIO3PvCr6iLLCuMFqKGy3fud2C1T7zd9QqyFzKWKA2+hc4cpHuIdI4f0Q0D+0VZfpDfAZmvxLU/VlUO6OmueQaXX2lo56iSsxaWXasoXc/Jtceckfc4E77dR6u3dXj1mu9uv/AEccpvVpqmVVBW4/PNBMw8nsMZIK5uTCSuUn2LLscu1bj3Nr90GZ/gtL+VKqjq3HubX7oMz/AAWl/KlW7l/wWVXcusiIuIZAuX3So/fB5l8YH8lq6grl90qP3weZfGB/Jat7A++/kVkYHRL4ZsI/1ioP+YjVxvdBsV+ymmVBkkMfFNaarhkIHPycnL5AR86pzol8M2Ef6xUH/MRrpvqxjkWWab37H5WB/nlFI1g2+7A3b84CzZU+FsJELscmVfX3PnKvspplX43NLxTWmqJjBPPyb+Y9gPJUPrKeSkrJqWYcMkMjo3juIOxU9dBLKvsBrTHapZOGnvVO6nI365B6TPzrPlQ51MhdzoeiIeQ3K4hkIN6S1246y3WWN3KNpmkHieQ+ZQ2tl1OuxvWb3KsDuKMSmOP+i3kFi8Ytz7tkFDbmN4jPO1pHhvz+bdfUPDaViYUVLyW3+7NWT5SLJ6M2j7EYDQse3hlqAZ39/pdS3JfOmhZT00UEY2ZGwMb6gNl9F81yLnfbKx+b2bKWloKjnuimM+aZpY8piZsy4Upp5Xbdb4zy/wCEhXjUG9NvEX5PolV1dPHx1VnlbWM2HMs6nj5CD7FbGnwtTD7HONERdsxhERAEREAWawXI63EsutmR257m1FBUNlGx24gDzb7RuPasKiNbWmDrpg2R2/LcTt2RWyZstNWwNlaWnfYkcx6wVmlRboL6usx+9OwC/VfBbrhJxUEkjvRhmPWzwDvpV6RzG4XCvqdU9GRPYREWEkIiIAiIgCIiAIiIDG5NYrVktjqrLeqOOsoaphZLE8bgjvHcR3rnP0ltELrpZfnVVI2SrxuqeTS1W2/k/wD439xHzrpUsZlVgtOT2Gqsd8oo6ygqmFkkbx847iOwrPRe6n+BDWzkIimDpJ6J3bSrIHTQNkq8dqnk0dXt73/439zh86h9dqE1NbRjCuL7n5ps7jrdRrnT7DY01t4h1/fvH0ewqtmjun931Izijx21RHhe4PqpvuYYgfScT6urxXUjErFb8ZxugsNrhbFSUUDYY2gdgHX61p5t3GPBd2WijKIiLlFwiIgCIiAKF+kteOGG3WSN3NxM8oHcOQCmhVW1cu/2Zzy4TtdxRQv8hH6m8vp3Xf8As5je1zOb7RW/8GO16iakp16NVo8lbbhepG+lM8QxnbsHM/PsoLa0ucGtG5J2AVtdOrSLLhltoeHZ4hD5PFzuZXoPtLk+zxVWu8n+iMdS29mwIiLwBsEa9JrFPtw0VyC1sjD6iOnNTTjb/OR+kPoXLs8jsV2LniZNC+GRvEyRpa4d4I2K5Ua44w/D9V8hsLmcMcNY90PcY3Hibt4bHb2LpYE+8Ssjbuh3ln2q65Wgyy8FLciaKbc8vT96T6jsuli482yrlt9xpq6BxbLTytlYQdubTuF1m03yCLKsDsuQwvDxXUccriPvttnf8QKrnw01IROdHS8/fHZh+ExfURrTdKPhSxP47o/r2Lcul5++OzD8Ji+ojWm6UfClifx3R/XsW9D+Evl/Yr5nWlERcEyBcltV/hSyz47rPr3rrSuS2q/wpZZ8d1n1710MD70isjcuiH++Ow/8Jl+okXTdcyOiH++Ow/8ACZfqJF03Vc/+IvkI9gudPTugfD0ga5ziSJKGnc0/2epdFlSL3RfHJIMpsGTxQu8jU0zqaaQDlxtO4G/qVMKWrSZdirdgmZT323zykBkdVG9xPcHAlddbHNHUWWhqIiDHJTxvaR1bFoIXH1Xo6I3SBstyxyiwjLayKgudDGIqWpmftHUMHUCT1OC2s6tyipLyKxZaZF+YpI5Y2yRPbIxw3DmncH2r+TSxQxOlmkZHG0buc9wAHrJXKLnlv00dNY6+olIEcVNI9xPVsGklcir5Kye9108exZJUyPbt3FxIV2+l7r/ZaDGKvCsPuUddda1piq6iB27KeM9YDhyLj1KjC6uDW4xcn5lJMnroHwPm6QFI5pIEdBUOcR6hyXo6ffw9n4pp/wAqRbr7nTi8kt+v2WzQuEUELaSB5HIucd3bexaV0+/h7PxTT/lSKylvJ+g8iAaQb1UIPa9v0rr5j8TILDb4YxsyOlia0dwDAAuQlH/lcP8AWN+ldfrN/wCT0X4PH+SFi8Q/lJietfC4MdJQVEbffOicB6yCvui5pY47VvKsnH/yO+lTj0FKyCl6QVBHMWh1TRVEMW/a7YO+hpUc61Y3JiWquR2B8TomU1fKIQRtvEXEsI8C0grDYXkNfimV2zI7W/hrLfUNnj36nbdbT4Ebg+BXfkvaVtLzRj7M67ooz0V1nxDUyxQ1FFXQ0d0DB5zb5pA2SN3btv74dxCkwcxuFwpRcXpmQKCunVVwU3R8uMUxaH1NZTxRA9ruLi5expUz3i8Wqz0r6q63GlooWDic+eUMAHtXP/pi60U+pOQwWHH5C7HrVI4sl6hVTEbF+3cOYHrJ7Vnxa3OxPyRDZX9Xm9zi+DzJfjYfUsVGVeb3OL4PMl+Nh9SxdDM/hMrHuU+1W+FHLPjqs+vevxpfFFPqXi8E8bJYpLxSMex7QWuaZmAgg9YK/eq3wo5Z8dVn171+dLXsj1NxWSR7WMbeaMuc47AATM3JKz/yfQg6gfqa6f8A8jbH+Js/Qn6mun/8jbH+Js/Qsx9sNg/jy2fjbP0p9sNg/jy2fjbP0rhcpmQwkumWnssbo34ZZC1w2O1IwfQFTvpv6OY/gbrVleKUnmVBcah9NVUwcSxk2xe0s36gQH8vBXdmyXHYYnSy361tY0buJq2cvnVMOnhqzj+WC1YTjVZHcIaCpNZWVMTt4/K8LmNY09pAc7c+I8Vs4js9otdir1oqqrm6AX6rv3QjzuzTv8o+y0tfBCN+YhMPlh87pPYAqZK6PQMxyS8aL59TTFzae8TPt7SerfzchxH+1C3svSht+TREe5S5W09zblY3KMwgLhxvo6ZzR3gPfv8AlBVSuNJNQXCooqlhjnp5XRSNPW1zTsR8oW/9HfUubSzUimyExPqKGWN1LXwtPN8LiCSPEEAj1eKvfBzraRC7nUhFgMKzLGsytEN0xy70tdBKwO2Y8cbPBzesELPrhtNPTMgXLvpRSsl6QOZuYdwLk9p9YAB+cK/OuWsWL6ZY1VVNVXU9TeTGRR29kgMj5OocQHvWg8zuuZN/ulXfL5XXm4SeUq66okqJ3d73uLiflK6GBW03J9ismbFol8M2Ef6xUH/MRrq+uUGiXwzYR/rFQf8AMRrq+oz/ALyETmL0rcV+1LXC/UccfBTVUvncA25cMnPb5d1oOG3mbHsrtd8p3FslDVRzAjr2a4Ej5N1bT3RjFeKHHsxgi5tLqKocB2e+aT84VNVuUS9pUtlX0Z2BsFxhu9kobpTua6KrgZM0g8tnAFY/Prq2zYfcrgTs5kDgz+keQ+lRd0Kcq+2XQ23U8snHU2l7qKTc7kNbzZv7Fk+knd/IWOis7H7OqZPKPH81vV8608HFd2ZGn8f0RaT1HZAr3Oe9z3HdzjuT4qTOjtaPPcwluL27x0UJIP8AOdyCjJWN6PVo8xws1z2bSV0pf/ZHIL3Pj2R7DClrvLp+f+hgrW5EkoiL5sbIXlvFBT3W01dsq2B9PVwvhkBG+7XAg/SvUiA5JakY5UYlnd5x2pYWvoat8Q3G27QeR+Ra8rbe6D6emjvNBqDQQfsNYBTVxaOqQD0XH1jl7FUld6mz2kFIxtaCIiykBERAEREB+oZZIZmTRPcySNwcxzTsWkcwQug/RD1zh1AsrMXyCZkWSUEQDSTt53GOXGP5w7Quey9thu1xsV3prvaKyWjrqWQSQzRu2c1wWG+lWx0yU9HYFFXvo0dIy05/SQ2HJ5oLdksbQ0Fx4Y6vb7pu/U7varCLizrlB6kZAiIqAIiIAiIgCIiAIiIDE5fjlnyzHquw32jjq6GqYWvY4dXcQewjsK5361aAZThWf01ltFHPdLfdZ+C2Txs33JPvHdxHb4c10Py/JrHiVkmvOQXGGgooRu6SR22/gB2nwVC9aekxk2S59R3DFJ3220Wio8pRRkc53Dlxyesb8uwFbuH7Tb49istFt+jdpFbtK8OZTljJr3WND6+p25l33jf5oUqKLuj3rDZdVcYbPC5lNeaZoFdRF3Nrvvm97T3qUVrW8ub59yyCIixgIiIAiIgMPml0ZZsWuFxcdjDA4t8TtsFUOWR8sr5ZDxPe4uce8lWf1gsl9yLG47VZY4neUmDpy+QN9Ecx1+KiH9R3NP8AR6T8YavZfZ2/FxqJSsmlKT9fJGGxNvoa/praDe81ttCW7x+VEkn9FvMq2YAA2A2AUVaM6f3XGLtV3G8xwtkMXk4QyQO23PM8lKq5f2hzYZOQlW9xii1cdIIiLgmQKjnuiOJ+ZZhZsvgi2jr4DSzuA+7Zzb8xKvGoq6UenFZqZpfNZbTHE66wzsnpDI8NbxA8xuercclnxrPZ2Jshrocxlfv3P/LPsxpXV47PLxT2aqIYCefkn8xt4Ag/KoA/Wkawf6Ba/wAfYpl6JejeqGl+f1FbfKShbZ66ldDUmKsa9wcObCGjxW/kzrsraT6lUmmV16Xn747MPwmL6iNabpR8KWJ/HdH9exWW196NupObav5DlFmhtn2Pr52Pg8tVhr9mxsbzG3Lm0rXsG6K2qllzWxXirgtJp6G409TKGVoLuBkjXHYbdewV4XVqtLfkNMvoiIuMXC5Lar/Cllnx3WfXvXWlULznoraqXrNb7eKSC0imrrjUVMQfWgO4HyOcNxt17ELdwpxg3yeiskR50Q/3x2H/AITL9RIum6pZoF0bdScJ1fx7KLzDbPsfQTvfP5GrDn7Oje3kO3m4K6ajMnGc04vfQmIWk62YBQ6k6fV+NVfCyWRvHSzEftUo96VuyLUjJxe0Scjc5xS94ZkdVYb/AEUtLV07y30mkB4H3TT2grBgkEEEgjqIXVjVfS7ENS7SKHJbeJJGftNVH6M0R8Hd3gqp530M8kpJ5JsPvtJcKfmWQ1f7FIPDi6iutVmQkvi6Mo4lerJqDnFliEVryq7UsY6msqXbD5V/L5qBm97iMN1ym7VcZ62vqXbH2BbtcOjfrHRucBiFRUbHrgka7f1c0t/Ru1jrHNBxCen37Z5Gt29fNZudXfaI6kRkkncncrPYDiV6zbKKPHrFSunq6p4buAeGMdrnHsAVicG6GmV1lTFJlt7orbTdckdKfKyHwB6la7SXSrD9M7YaTHLeGzyD9mq5fSml9Z7B4BYbcyEV8PVkqJ6dHMFoNOsAt2MUPC90DOKolA2Msp9875VSPp9/D2fimn/KkXQxVI6VegOoOo+qhyPGoba+h8wig3nqxG7iaXk8tur0gtPFsSt5SZZroUto/wDK4f6xv0rr9Zv/ACei/B4/yQuf1P0R9X2VEb3U9k2a8E//AJAd/wDRXQW3RPgt9NBJtxxxNY7bvAAWTNsjPjxeyIo+6Ii0CxVTp36R1V/t8OoeP0rp62hjENxgiZu+SEb8Mg7y3qPht3Kjh5HYrsa4BzS1wBBGxB7VXLW3oqYxmNVUXnFKhmP3WU8T4gzemkd38I5t38F0MbLUVwmVaKCUtRUUs7Z6WeWCVvvXxvLXD1ELaaPU7UKkgEFPmV7bGBsAatx5eslSTf8Aoo6uW2Uilt1Fcoux9PUt3P8AZPNa87o7awiUx/aXWn+cNtvlW77WqXmiumR7fMiv18kL7zebhcD1/wDiKhzwPYTsFj4oJpWSviie9sTeOQgbhrdwNz3cyB7VPOG9E7VK9VLfspS0lkpeIB0lTKC7bt2aOanq89GWiseh96xbEOCvyS6GDy9dVODOIMka4tb963keXaqSya4aSZOmUIV5vc4vg8yX42H1LFDn60TVr+CtP441Wa6H+mGTaX4nebZk7KZs9XXCeLyEoeOHybW89vELFlXQlW0mEupQfVb4Ucs+Oqz6961pWbznoq6pXnNb7d6SK1+b11xqKmLiq2g8D5HOG479iFh/1omrX8Fafxxqzxvr0viI0yviKwf60TVr+CtP441P1omrX8Fafxxqn3ir+pDTK+IrB/rRNWv4K0/jjVkrJ0N9RaqqYy53Oz2+E83P8oZCPABqPIqX8w0yudroKy6XKmttvp5KmrqZWxQxRt3c97jsAAuo/R+wIab6VWnGZHB9YxhnrXA7gzv5v28ByaPBq1jQro9YhpfM26guu994OHzyoYNou/ybfufX1+pTKudlZKt+GPYslooZ05NIqzH8vm1Bs1IX2W6vBrPJt/yaoI5l3c1/Xv37+CrIuw1yoaO5UE1BcKaKqpZ2FksMrQ5r2nsIKqZqx0OaWsq5rjp/dm0XlHlxoKvnG3ck7McOYHV1rNjZaS4zIcSnVnvF2s9QKi1XKroZQd+KCVzDv7FslTqpqNUU/m82Z3l8W23D5yepbleujLrFbZnxtxnz4NPJ1JM14d6t9l8rV0atY6+RjDiklJxHbiqZWsA9fMrbdlT6tojqRNW1dVW1DqisqZqmZ3vpJXlzj7SvxNFJC8MlY5ji0O2cNjsRuD7QQVczSHodspK+K56h3OKqbE8Obb6Q+g8gg7Pf2jwC1/Wjow6j5Lqhfb3j1HZo7TVVHFSMdWCMtjDQAOHbltt1Kqyq3LWxplf9Evhmwj/WKg/5iNdX1RDTXot6q2DUbGb7cKezijt13pauoLK4OcI45mvdsNuZ2B5K960c2cZyXF7LRIy6UOKjLtEsgt7I+Oogg87p+XU+Pn9G65fHkdiuxVTDHU00tPM0PilYWPae0EbEKguV9ErU+TJrlJZ4LTJb31L3Uzn1oa4sLiRuNuSvhXRinGT0JIzXud2VeZZnecSmk2juFOKmFpP3bOTvmIUk653f7KZ7UxsdxRUbRA31jr+dRZproJq/plmlvzaWltHm9seZKhra8buj22cOrn1rP3GpfW189XISXzSOeSfE7r0ngOPGeTO9dUlr6v8A0MVj6aPzRwPqquGmjG75XtY31k7K4WPUDLXY6K3xt2bBC1m3iBzVbtE7R9ls+oy9vFFS7zv7uXV86tAtf7U5HKyFK8uv5k1LpsIiLyZmCIiA1bVjEKTO9PrtjFW1p87gIhcfuJRzY75VyqySz11gv1bZblC6Gro5nQyscNiCDsuvyp50+NKeNkWpVlpubdobq1g6/vZPzH2LewruMuD8yskU0REXVKBERAEREAREQH6hlkhlbLDI+ORh3a9h2LT3gjqVodB+lfdsfZTWLPo5LpbWbRsrmc54m/zh92PnVXEVLKo2LUkSno64YXmGNZjao7ljd3pbhTvG/wCxPBc3wI6wVnlyKxHKshxK5suWOXeqttS078ULyA7wI6iPWrIac9MjI7c1lLmlmhu8Q2BqaU+Tl28WnkfmXNswZL7nUspF5UUJYf0otJb+1rai9Ps0x62V8ZY0f2upSTZc9wu8s47XlNoqmkb7sqm/pWpKuce6LbNkReAXqzkbi7UBHhUM/SvLWZXjFG0uqsgtcQHWXVTP0qumDMoo5vuuWlFmje6rze1OewbmOGXyj/YAogzfpl4jQxyRYrZK66z8wyWceRi9ZB9L5lkjRZLsiNotI9zWML3uDWgbkk7AKEdaeklhGAwTUVvqY77ewCG01M8Fkbv57uofSqc6n9IPUnPGyUtXdzbbe/8A9JQ7xtI7i7rKiYkkkkkk9ZK3asHzmyHI3nVvVPLtTLwa7Ia4mBriYKOIkQwjwHafErRkRdCMVFaRQz2A5dfMIyelyHH6x9NWU7t+R9GRva1w7QV0m0C1dsWquLsraN7Ke6wNDa6iLvSjd3jvaewrl2th08zK+4JlFNkOP1bqeqgd6Td/Rlb2scO0FYMjHVq/ElPR1tRRxoNq1YtVcWZcKB7YLlC0NraJzvTif3jvaewqR1xpRcXpmQIiKoCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgI71/u/2Pwd1Ix20ldIIgO9o5n8yrapS6Rt387yqntbHbso4d3AffO5/QotAJIAG5PIBfR/AMf2OFFvvLr/v6GtY9yJ26NVo8lbK+8vbzneIYz/Nb1/OpgWvacWkWXC7bQ8OzxCHyeLncythXh/E8j3jKnZ5b6fJdDPBaQREWgWCIiALxX210N7s1XaLnA2oo6uJ0U0bupzSNivaiA5e9IrSy4aW53PbXxvfaqkmW31BHJ8e/vSe8dRUZrqfrxppbNUMEqbJVsYyujBkoKkjnFLty59x6iuY+Y43d8SyOssF8pH0tdSSFj2OHX3Ed4Peu1i3+1jp90Ua0YhERbJUIiIAiIgCIiAIiIAg5IiA+ramoaNm1ErR3B5XyJJO5JJ8URAEREAREQBERAEREBsmnGa37Acppshx+rdBUwuHGzf0JmdrHDtBXSfQrVew6qYrHcrbI2GviAbW0TnenC/8AO09hXLRbNppnF/0+yqmyHH6p0M8RAkjJ9CZnaxw7QfmWtkY6tW13JT0daEWgaIapWDVLFI7ta5WxVkYDayjc704H9vrHcVv640ouL0zIERFAC8VZdrVRzeRq7nRU8u2/BLO1rtvUSvaoO1QttNeNa7Ta6zj83qWRsk4HbHbn2re8PxI5VjjN6STf5FZPSJf+2Cw/x3bPxpn6V96O522tcW0dwpKlw6xFM15+YrRf1G8O+8rvxgrwXrRy2xU3nON19ZRXCL0oi+XdpI6hv1j1rOqPD5PSta+cen7kbl6EqItC0kyuuvENXZb4R9mLc7glPL029W/rW+rRyceePY6590WT2thERYCQiIgCIiAIixuUXaKxY9W3eYcTKaIv4fvj1Ae0kBWhBzkox7sHvllihYXyyMY0cyXHYLwMv9kfKYWXahdIOtonbv8ASooxXFLnqRTnI8pu9UyjmkcKekgOw4QduW/IDfl1E8lskujeHPgMbG1zHbcnicE/RsupPDxKJOu618l30tpfVtbKbb7IkRrmuG7SCD2gr+qMscw/LsUyWkitd7NbYpXETsqNyYmgb8hvyPYCOXepNWlk0wqkvZzUk/8AfVeRZPYREWsSEREAREQBERAEREAQkNBJIAHMkosVmH7krx+AzfkFWhHlJR9QZNj2SDdj2uHVuDuv0o36OrnPwCRz3FzjXSbknc+9YpIWbLo93ulVvenohPa2ERFrkn8keyON0kj2sY0Euc47AAdZJWO+2Cw/x3bPxpn6V+8j/c9cvwSX8gqENG8EsWV2WurLqKkyw1ZiZ5OUtHDwg/nXSw8Om2md1smlFpdFvuVcmnpE2DILCTsL3bfxpn6V74JoZ4hLBKyWM9TmOBB9oUenRvDtve134wVrN9sV40sq2X3H6+aqsr5GtqqaY7kAn5D4HrWSGHi3vhRY+XkmtJ/hvZHJruia0XltFfT3S101xpX8cNRGJGHwIXqXKlFxen3LhERQAiIgCIiALzVtwoKJzG1tdTUxk34BNK1nFt3bnn1r0qG+kp+2Y/8A1sn+Fbnh+KsvIjS3re/22Vk9LZMiIi0ywREQBERAEREAREQGErsSxquq5Kuss1JPPId3yPZuXFfJmE4mx7XtsFCHNO4Pk+orYEWdZNyWlN/myNI/jQGtDWjYAbAL+oiwEhERAEREAREQBQp0ptE6PVDGjX2yKKDJqFhNNNtt5w0f5px+g9imtFaE3CXJA493e3V1oudRbblSy0tXTvMcsUjdnNcOxeVdGuk9oJbdTLXJebLHDRZRTsJjlA2bVAfcP8e4rnpkNmueP3iotF4o5aOtpnlksUjdi0hdqi+Nq6dzG1o8CIizkBERAEREAREQBERAEREAREQBERAEREAREQBERAbXpZnt/wBOsrp8gsNS5kjCBNCT6E7O1rh//bLpdo1qJaNTMMp8gtQfE4jgqIHjYxSDrHiPFUX6Mmgl01OubLtdmS0WMU7/ANlm22dUkfcM/OV0Mxqx2rHLLTWay0UVFQ0zAyKKNuwA/OfFczOlW3pdy8dmRREXPLBQ3mn74Gwf/q+gqZFBeq89ypdZbZUWimZVV8ccZghf1Pdz5HmPpXZ8EjyunFecZfsUs7E6ISANydgFFH20av8A8jLd8h/7q+VTV6xX+B1AbTQ2eKUcEk7XBpAPX1vcfkCxLwqafxWQS/8AJDmefTyR1z1uv1yo/wDJGh4eW8w7qA5+sLa8zfndwvv2Fx9sNvoDG18lwdzcN9+Q8eR6vlWR05w+lxC0up2SmoqpncdRORsXHuHgvjlWf2axXEWprKi4XJ221LSt4nAnqB7lntv9vl7x4c1FJLa9PP8A+kJaXU15+mV7kPnEuc3N1YOqTc7fTuvlhmTZFj+Xx4bmUvnHlwBRVnXxk9Q37QeY58wfBZgZllzh5Runtd5Lxq2cSj/UnIp7tl+LzS2WttNZS1PpCoHJ3pxkcJ7diD8q3MevIym6chRaafVcdppbXYh6XVG4a6NvNuoaPIrRXVULaWQMqY45CGuaTyJHV18vat7xm6wXywUV1pyOCpiDyB9y7tHsO4X0v1tgu9nq7bUt4oqiJ0bvaOtRloTcJ7ZcLthNxcRPRyukh37Rvs7b5j7SudGKycF6XxVv84v/AA/0LdpfMliR7Y43SPOzWgknwUY6XV1yyfNL3kUlZUG1RSGGlh4z5Mnq329Q39ZWY1qvjrPhc8MDtquvcKaEDr9L3x+TdZbTixNx3D6G3cO03B5Sfxe7mfk5D2KlSVGHKxrrN8V8l1b/AGRL6y0bEtY1UtVVecCudBRML6hzGvYwdbuFwdt8gWzotGm102Rsj3TT/IlrZEWkOoFkoLBTY5epfsdV0pMYMw2Y4b9/YefapXpqulqoxJTVEUzHdTmPBBWCyXCMZyFzpLlbIzO7rmj9B/tI6/butJr9GxSl02M5HXUEu+7WyOO395ux+ZdS14OXN2cnXJ99ra3811KrlFEsrXNTKiekwS7VFNK+GaOHdj2HYtPEOoqNqXMszwO8U9szKPz2glOzajrdw9pa4de2/MHmpB1Pljn00u00Tw+OSmDmuHUQXDYrH7hPGyKnJqUZNaa6p9SeW0zRcXyjJ75j9vx7HHl9eIRJXXGc8Qi3PIeLtl9rxptl0dJJX0uZVdTXsaXcJLmh3gDvyWb6PlHBBp7DVRsAlqZ5HSO79nFo+YKRFs5ee8XJnCiKSTe+ie/X6eiRWMdrqRBhWqFS7FaiC4xGrvlNIIIIh76ocd9uXhsdz4L1zYNmmRRee3zK5aOaQbtpYGngi7hyIWI0ztlKNaciLmBxo5JfJcuQJftuprVvEMiGHd/y0UnJJ70nra7LfZCK5LqQ3g99yTFs7ZhmRVfndPMf2GZ5JI3G7SCew93epZvM9VTWqpqKGnbUVMcZdHETsHkdiirWdog1HxKrZykdLHGfV5UfpUr3OupLbQy11dOyCnibxPe48gFr+IJWexvjHrNdUvNp6/UmPTaI4hxvUDJ2mrvmQvs0UnvaOl7B47Hr+VeK8YjmeJUhuuO5LV17KcF8tLOd+Jo69h1FZyPUiW6PeMYxe43aJp2M24iZ7CetfqbNsggid9lcBuUcJBD3RTNk5dvILajZmxlpwil/T8K/R9f7kaiZzTvKIcrx2O4NZ5Odp8nUR/ePHX7FperN7q7TqJjrW101PRFrZKhrXbNc0PO5I9QXw6OE5kivrGgtjNSHhp6xuvHrnTx1mo+MUkwJin8nE8A9bXTbH5ir0YtdPik6tfDp/tv9CG24bMl5XPs8ldVWypFgspJ8i537ZKO/vWSzXD7pLjTKgZTWwG3WoxzRsaS2pcxpJc7n29XUpDgijghZDE0MjY0Na0dQAWNzD9yV4/AZvyCufHxCTtiqoqMU+i0v1b7luPTqQ3pJh9zv2KGtpMsr7VG2pfH5CBm7dwGni98OZ3+ZThaqZ9Ha6SjlqH1MkELInTP99IWtALj4nbdR/wBHP4Pn/h0n5LFJKt4zkWWZU4SfRN66IQXQIiLkFzwZH+565fgkv5BUc9Gr9y90/Dz+Q1SNkf7nrl+CS/kFQLpReM5t1prYsWsNLcaZ1UXSySg7tfwjl79vZsu7gUu7Bugml1j3ekY5PUkWJWk63VsFJpzcWTFpdUcEUbSet3ED9AK177aNYDy+023fIf8Aur4tw/NM2udPVZxNFQ0FO7iZRwEHiPdyJA37ySVTGwY49sbbrI8YvfRpt69EiXLa0jZtLI7hQ6V0LhEZqoQOkijfy3BJLR8mywsNh1CyoGrvF9fYqd/vKSl99t47H6d1I881FaraZZnx01JTx8yeTWtAWks1KNylfHjGN3G8NYdnSgiNnylVptvtnZbTBdXvb1035degaS0mYS64VmONUrrnjmUVlY+Dd76ac78YHXsOonwW46b5THl+OGokZ5GriPkqqMbjhd3j1rFvzbI6dhNxwG4si29J0U7ZOXqC1vo+VPlr3kvk2Pjhkm8o2Nw2LfSOwPiAVs3V234k7L0uUdaa1129NPRCaT6H2xC7XPHdVq3GbxX1FRS1fOkdNIXbb827b9/UpcUW692eUUdFlVA0iqtsg4y3rLN9wfYVvuJXiK/Y7RXWEgieIFw7ndo+VamfFXU15UV36S+a/wAomPR6Nd1nv8tkxF0dHI5ldWvEEBYdnAnrI8VnMGoau34tQ09fUy1FWYw+Z8ry4lx59q0C5j7ctZoaEenbrI3jk7i/r+lS0qZaVGNXTr4n8T+vZfkSurbChvpKftmP/wBbJ/hUyKG+kp+2Y/8A1sn+FZPAv+uh9f2ZFn3SZERFyC4Uc5tmV1qb+MTwyNk1x/8AU1J5tg7/AA3Het/uU5prdU1LRuYonvHsBKgXSTKqSyVF2uNbbLlXVdXPzlp4C8AdexPfuV1/DMX2kJ3ceTjrS9W/X5FJPXQ3OLTK71LPOLpml0fWHnxRO2aD7V5pbllundbT/ZysN6sErxGakj9kh37+1Zb9VO3/AMnr/wDihWKy3PbXfccrrVLjd9Pl4i1hdRnYP29E/Lst2tZtk1HIr3B9+iWvlrtoq+PkyUIaqCaibWwyCSB0flGub1Fu2+6iW21GValXKulpLxJaLDBKYmCHk+T9K2LRE1s2n0dHcY5o3RPfCGysLXBnZ1+BWr0NFmGmdxq47bbPszZJ5PKbRj02fJzB+ULDi0Rosurg17RdI71rv11vpslven5GRm0yyGh3qbJmdc2oaNwJSdnHu3BW54BPks1kIyiCKKsjkLA5h/bGj7orB2TVfGa2QU9eai1VPUWVLDsD6/8A6W9UtRBVU7KimmZNE8btex24I9a1s63K48MmHXyetP6NdyYpeRF18vOTZdnVZi+OV/2Mobf6NXUN9+TvsdvbuAPAr9S6WXWP9mo80uTKkc+N5JG/sIXxyCw5TiOa1uVYxTNuVNcHF1VTEek0k7n599iO9ZO1at2Z0opr9Q1tmqepwmjJbv8AT8y6DeRGuLwUnHS3pJvfntPr3K9N/EZXTr7dKeatt2U+SqIabYU9WD6Uu/08u9bivLarlQXWkbV26riqoHdT43bj1eC9S4OTY7LHJxUX6Ja/QyLsERFgJCIiAIiIAiIgCirXjQ/FtU7c6Spjbb73G39guETfS8GvH3TfnUqorRk4PaByl1X0zyrTW+vtmRUD2Rlx8hVMG8U7e9rvzLS110zLFbBmFlks+R2yC4Ucn3Ejdy097T1g+IVLddeifesf8vecBdLd7aN3Ponf5REPD74fOupRmRn0l0ZRxKuovpVQT0s76ephkhlYdnse0hzT4gr5rdKhERAEREAREQBERAEREAREQBERAERbppZphl+o93bQY3bJJI9/2WqkHDDEO9zur2KJSUVtg06GKSeZkMMbpJHnha1o3JPcArW9HDos1d381yfUSJ9LQHaSG2HlJKOwyfejw61N2hPRxxHTpsNzuDGXq/tAd5zM39jhP8xp+kqcFzb8zfwwLqJ5bRbqC0W6C3WykhpKSBgZFDE0Na0DsAXqRFzywREQBQ3mn74Gwf8A6voKmRald8Ip7jndFlT66VktJw8MIYOF22/Wfauj4bkV0Tm5vvFr6tFZLZtqIi5xYHqOyhvRV9Mc9ydt24DeTUHybpPfbBz+MN3/ALPsUyLR8206t9/uDbtRVUtrurTv5xD916x3+K6WBfVGFlNj0ppdfTT3+T8ysk+jRvCg/Wq80dzzbH6OieJhb6gCeVvNoe9zCG794DCfatpp9PMgqIm015zq6VNMORjiJZxDuJJK9190zsVdjkFnovKUBp5vLMnZze5+2xLievf8y2cGeJh3qcrOXddE9La1vr1fy0RLckbyog1cp5cXze0ZxRMPk3PEVWB2+v1t3HsCli2wPpbdTUr5TK+GJsbpD1vIAG/tWq6zPt7dO7mLhts5m0I7fK7+jt7Vq+GWezyox7qXwv8AFPoTJbRqlVNHnertDDA7y1ps8IncfuXOIDh/hHyqXFHOgVgNqxD7IzM2qLi7ynPrEY5NH0n5FIynxScfaqmv7sOi/u/qxDttha/neUU2J2llwqKaaoa+VrOGNvUO0k9mwWwL8VEMNRA+CoiZLE8bOY9u4cPEFaNUoRmnNbXmuxLMXjuTWPIKYT2u4Qz8ubOLZ7fWDzCyxc0DckAetR9edJMcqqnzu1zVdnqN9w6mf6I9QPMewrGnSe6yPLJ89u0lP2MPH+d+y6Dx8Gb3G5xXo4tv9OhXcvQ8HSHulDcKe24/QuZV3I1PHwRek5g2I25dpJ6vBbdm9LJRaP1dHKd5IKCONx8RwhfTDdOcdxmdtZBFJV1zd9qic7kE9ew6h9Kz2VWkXzHqy0umMIqWcBeBvw8wfzLLPMpi6aa23GD22/Pr6eg0+rZqugfwZ0P9bN9YVvqwWCY8zFsbgszKh1Q2Jz3eUI2J4nE/nWdWhnWxtybJw7Nt/qWitIiHTX4acu/rJPy1Ly1LHcMZZ8zuuRMrXSm4uc50RZtwbu35Fbas3iV8L7VKD2uKX5IiK0iIdbv3c4h+Es+tasj0izVDDIPJF3m5qQJw3tG3L862DNMMZkl9tNzfWug+x0jXhgZvxkODuv2LY7rb6O6UEtDXwNnp5Rs9ju1bUM6ur3aS68N7X1I4t7PFhrrY7GqF1pEQpTC3hEe2w5c99u1fbIrxQ2O1TXCvmbHHG0kAnm89jR3krQItL7pa6txxvL6220rnE+R2LtvDkQsxaNOqSOvZcL7dK6+VUZ3Z50/djT3hv6VhspxObsdu131p7+XXp9SU36Gr9HNxdLf3OYWF04dwnrG+5Xz1m+FTEP62D69bvjuEU1jy6tvlFWzCKsB46Y+9Did9wmW4RTZDktqvctfLBJbnMc2NrAQ/hfx8z2dy3Pf6Pf3kb+Fx/XjrRXi+OjbVi8vBOJ3cAbk0M2w/sFZRfmRjZI3RvaHNcCHA9oXCrlxkpehkI16OUsRwKWPyjeNtdIXN35j0WKRaispqellqpZ2NhhBMj99w0Dr6lF8+jccNdLLZslrrdBKTvExp3aO7cOG/tW4WfD6e14dV47DX1MzanjL5pju4OcADt4ct9vWur4h7pda7oWb5Ptp9PXqUjtLWjO2u4UV0o21dvqGVEDiQJGdR2XqWEwmwMxnH4bRHUOqGxOJD3DYndZtcu5QVjVb2vIsjwZH+565fgkv5BUc9Gr9y90/Dz+Q1SdcacVlvqKQu4BPE6Mu2324gRv8AOsBp5iEGHW2pooKySqE8/li57QCDsBty9S3aciuOHZU38Ta19CGviTNmREXOLEd9II1YwF/m5cIjOwT8Pa3f9K2TTt1sdh1tNpEQg8g3iDNvf7elvt277rMXGipbhRS0dZC2aCVvC9jhuCFHH6l1wtta+TGMrrLVTvdxGHYuA8BsR866tNtN2KseyXBpt702nv10UaaeyQr3dKKz22avr52RQxtJJcevwHeVFHR/m84yTJanybo/LSeVDXdYDnEj5itqtmnNOa2OuyG8V99njO7W1D/2MH+j+ley0YPTWrN6jJKKslYyoaRLS7ehuRtuFeu3Fpx7aVLbku+unR9vX6jTbTNlutFDcrbUUFQ0OinjMbgfEKGMDyN+Dw5JjlzeQ+hD5qUO+6PcPmKnBQbqzaqS/wCrFstVAP8AxMrGtrCOoDffn7Ffwdwt549v3Gt/Lj13/YT6dUbjobZ5aTG5bzWNPnl1lM7ievh35KQV8qOnipKSKmhaGxxMDGgdwGy+q5mXe8i6Vj8/9oslpaChvpKftmP/ANbJ/hUyLUNRsGp8zFEJ6+Wk81LiPJsB4uLbv9S2fCsivHy42WPSW/2ZE1taRt6KLv1JZv5ZXj+9/wDafqSzfyyvH97/AO1PuuH/AN//ANWNv0JPmjZLC+KQbse0tcO8FQxp5L9oef3DGb04R01c7jpZn8muO52O/iOXrC3LDsBkx69NuLshr7gGsc3yU/McxtuOfWs7luMWnJ6AUl0g4uE7xyt5PjPeCr03UY7lS5cq5rq0tNPya36ENN9TMBjCNw1pHqWv5jllmxeOn8+3lmnkDI6eEB0h37du5atBp5k1EfN7bntwgoh72MglzR4Hfb5ll8a06tFrrxc66aou9xB4hUVbuItPeAqKnErfKdnJeiTTfz32/UnbfkbJcbrRWyySXat4qanZH5R4eNnDw2HavpZ7pQXehjrbdVR1EEg3DmHfbwI7CvvVU8FVTvp6iJksUjeFzHDcEKOrppRTsqXVGNXutspcdzGxxLB6hvv86w0QxrE1ZJxfrra/yS9rsbdlNhx+522d13oaV8bGFxkc0As2HXv2LR+j5UPjsd6a+dxt1PVf+Hc88mt2O5+QBfQaX3euc2PIMzuFfTA+lECQHDu5kqQbFZ7fZbXHbbdTthpoxsG9e/eT3lbdl1VONKiNnPk166WvTfmyqTb2fDGsitGRUnnNqrI5gCQ9m+zmkd4616bpaLZdIHQXChp6mNw2IkYCtNyLS+1VtZJcLLWVNlrHklxp3bMcT3t/QsZ+ppktQzze4Z7XzU3V5NocOXtJVFTiN867uP4NPa+q7/oNv0PBpKyCi1UyO3WaUmzxxkta127Q8OG23/EFMKwmIYvacWt5pLXCW8Z4pZXnd8h7yVm1h8RyY5F3OPbSW33el3fzJitIIiLRLBERAEREAREQBERAEREBGmquiGn+okUkl3tDKa4OHo11IBHKD3nbk72qomrHRQznF3S1uNbZHbm7kCEbTtHizt9i6DIs9WTZX2fQhrZx7udur7ZVPpbjRz0k7CQ6OaMtcD6ivKutGbYBh2Z0jqfJcfoa8OG3lHxgSD1PHNV3zzoZWCtlkqMQyKotpcSW09WzykY/tDn8y3686EvvdCvEo+im/M+i5qxj3HJT2iK9U7ep9DIHuP8AY61FV1xPJ7VKYrjj9zpXjrElM8bfMtqNkJdmRowqL9SRyRu4ZGOY4djhsV+VcgIiIAiL1UtuuFVt5rQ1U+/V5OJzvoCA8qLfcT0c1LyeVrbTiFyew/52WIxxj1ud1KacL6GWW1pZLlF+obVGduKKAeWkHt9786xTvrh3ZOmVZW6af6WZ3nNXHDj2PVk8bjsah7CyJniXHkr5ac9GjTDD/J1Etsde65nPy9eeJu/eGdQ9u6mOkpqekp2U9LBFBCwbNjjYGtaPABalmev5EW4lWtJOh/YrX5G4Z9Xm61Q2d5lTkthae5zutys1j9ktGP22O22S3U1vpIxs2KCMNb83WfFZBFoWWzsfxMtrQREWMBERAEREAREQBERAEREAREQH5mcWRPe1vE5rSQO/wUKXyLM9Sblb6OqsE1ntkEgfMZSQD3nmBuQN9h4qbUW7h5nurc4xTl5N+RWS2fKkp4qWlipoGBkUTAxjR2ADYL6oi029vbLBERQAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA1rP7/AHew0VNJaLHLdpZnlhYzf0OXInYFarpLi15jvlflmSwGGuqiRFG8+kwHrJHZ3KT0W7XmuuiVUIpOXd+bXoV47ewiItIsEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAX4miinjMc0TJGHra9oIPsKIgNfu2BYTdWkXDE7LUb9ZdRsDj7QN1rtVodpLU7+WwW0nfua5v0FEVlOS7MGMn6OejMruL7SaOPwZLIB+UvTS9H7Ryn2MeCW0kdrnSH6XIit7WfqxozFv0j0zoJBJS4TZmub1cVOH/lbraLdZbPbgBb7TQUe3V5CnZH9ARFVyb7sHvREVQEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//9k=";
const fmtUSD = (n) => "$" + Math.abs(Number(n) || 0).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtUSD2 = (n) => "$" + (Number(n) || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (n) => (Number(n) || 0).toFixed(1) + "%";
const today = () => new Date().toISOString().split("T")[0];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const FEE_RATES = { Swappa: 0.03, eBay: 0.13, BankMyCell: 0, SellCell: 0, Facebook: 0, Craigslist: 0, OfferUp: 0.129, Other: 0.05 };

function federalTax(income) {
  if (income <= 0) return 0;
  if (income <= 11925) return income * 0.10;
  if (income <= 48475) return 1192.5  + (income - 11925) * 0.12;
  if (income <= 103350) return 7279   + (income - 48475) * 0.22;
  return 19368.5 + (income - 103350) * 0.24;
}

const SEED = [
  { id: "s1", date: "2026-06-01", model: "iPhone 16 Pro Max", storage: "256GB", condition: "Good",  buyPrice: 616, sellPrice: 849,  platformBought: "Swappa",  platformSold: "Swappa",   shipping: 12, notes: "Battery 88%", status: "sold" },
  { id: "s2", date: "2026-06-03", model: "iPhone 16 Pro Max", storage: "256GB", condition: "Mint",  buyPrice: 640, sellPrice: 925,  platformBought: "eBay",    platformSold: "eBay",     shipping: 12, notes: "",           status: "sold" },
  { id: "s3", date: "2026-06-05", model: "iPhone 16 Pro Max", storage: "256GB", condition: "Good",  buyPrice: 616, sellPrice: 849,  platformBought: "Swappa",  platformSold: "Facebook", shipping: 0,  notes: "Local cash", status: "sold" },
  { id: "s4", date: "2026-06-07", model: "iPhone 16 Pro Max", storage: "512GB", condition: "Good",  buyPrice: 720, sellPrice: 999,  platformBought: "eBay",    platformSold: "Swappa",   shipping: 12, notes: "",           status: "sold" },
  { id: "s5", date: "2026-06-10", model: "iPhone 15 Pro Max", storage: "256GB", condition: "Fair",  buyPrice: 400, sellPrice: 560,  platformBought: "Swappa",  platformSold: "eBay",     shipping: 12, notes: "Screen scratch", status: "sold" },
  { id: "s6", date: "2026-06-12", model: "iPhone 16 Pro Max", storage: "256GB", condition: "Good",  buyPrice: 616, sellPrice: 849,  platformBought: "Facebook","platformSold": "Swappa", shipping: 12, notes: "",           status: "sold" },
  { id: "s7", date: "2026-06-15", model: "iPhone 16 Pro Max", storage: "1TB",   condition: "Mint",  buyPrice: 900, sellPrice: 1150, platformBought: "eBay",    platformSold: "eBay",     shipping: 12, notes: "",           status: "sold" },
  { id: "i1", date: "2026-06-20", model: "iPhone 16 Pro Max", storage: "256GB", condition: "Good",  buyPrice: 616, sellPrice: null, platformBought: "Swappa",  platformSold: null,       shipping: 0,  notes: "In hand",    status: "inventory" },
  { id: "i2", date: "2026-06-21", model: "iPhone 16 Pro",     storage: "256GB", condition: "Mint",  buyPrice: 510, sellPrice: null, platformBought: "eBay",    platformSold: null,       shipping: 0,  notes: "",           status: "inventory" },
  { id: "i3", date: "2026-06-22", model: "iPhone 15 Pro Max", storage: "512GB", condition: "Good",  buyPrice: 450, sellPrice: null, platformBought: "Swappa",  platformSold: null,       shipping: 0,  notes: "",           status: "inventory" },
];

function calcItem(item) {
  const fee = item.platformSold ? (FEE_RATES[item.platformSold] ?? 0.05) * (item.sellPrice || 0) : 0;
  const net = item.sellPrice ? item.sellPrice - item.buyPrice - fee - (item.shipping || 0) : null;
  return { ...item, feeAmount: Math.round(fee * 100) / 100, netProfit: net !== null ? Math.round(net * 100) / 100 : null };
}

// ─── components ───────────────────────────────────────────────────────────────
const Badge = ({ children, type = "gray" }) => {
  const styles = {
    green:  { bg: "#0d2818", color: "#4ade80", border: "#14532d" },
    red:    { bg: "#2d0f14", color: "#f87171", border: "#7f1d1d" },
    amber:  { bg: "#2d1f07", color: "#fbbf24", border: "#78350f" },
    blue:   { bg: "#0d1f35", color: "#60a5fa", border: "#1e3a5f" },
    purple: { bg: "#1a1040", color: "#8b7cf8", border: "#4c1d95" },
    gray:   { bg: "#f0f1ff", color: "#9ca3af", border: "#374151" },
  };
  const s = styles[type] || styles.gray;
  return (
    <span style={{ fontSize: 11, fontWeight:800, padding: "2px 8px", borderRadius: 20, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em" }}>
      {children}
    </span>
  );
};

const Metric = ({ label, value, sub, color, small }) => (
  <div style={{ background: "#ffffff", border: "1px solid #1e1e2e", borderRadius: 12, padding: "14px 16px" }}>
    <div style={{ fontSize: 10, color: "#9ba3c8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight:800 }}>{label}</div>
    <div style={{ fontSize: small ? 18 : 22, fontWeight:900, fontFamily: "'DM Mono', monospace", color: color || "#0d0f2b", letterSpacing: "-0.5px" }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "#9ba3c8", marginTop: 4 }}>{sub}</div>}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: "#ffffff", border: "1px solid #1e1e2e", borderRadius: 14, padding: "18px 20px", marginBottom: 14, ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 10, color: "#7b6cf6", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight:900, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ width: 3, height: 14, background: "#7b6cf6", borderRadius: 2, display: "inline-block" }} />
    {children}
  </div>
);

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <div style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontWeight:800 }}>{label}</div>}
      <input {...props} style={{ width: "100%", background: "#f7f8ff", border: "1px solid #1e1e2e", borderRadius: 8, padding: "8px 11px", fontSize: 13, color: "#0d0f2b", fontFamily: "inherit", outline: "none", boxSizing: "border-box", ...props.style }} />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <div style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontWeight:800 }}>{label}</div>}
      <select {...props} style={{ width: "100%", background: "#f7f8ff", border: "1px solid #1e1e2e", borderRadius: 8, padding: "8px 11px", fontSize: 13, color: "#0d0f2b", fontFamily: "inherit", outline: "none", boxSizing: "border-box", appearance: "none", ...props.style }}>
        {children}
      </select>
    </div>
  );
}

const Btn = ({ children, variant = "primary", onClick, disabled, style }) => {
  const vars = {
    primary: { bg: "#7b6cf6", color: "#fff", border: "#7b6cf6" },
    ghost:   { bg: "transparent", color: "#9ca3af", border: "#e8eaf5" },
    danger:  { bg: "#2d0f14", color: "#f87171", border: "#7f1d1d" },
    success: { bg: "#0d2818", color: "#4ade80", border: "#14532d" },
  };
  const v = vars[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${v.border}`, background: v.bg, color: v.color, fontSize: 13, fontWeight:800, fontFamily: "inherit", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all 0.15s", ...style }}>
      {children}
    </button>
  );
};

// ─── pages ────────────────────────────────────────────────────────────────────

function Dashboard({ items, setPage }) {
  const sold = items.filter(i => i.status === "sold");
  const inv  = items.filter(i => i.status === "inventory");

  const revenue  = sold.reduce((s, i) => s + (i.sellPrice || 0), 0);
  const cogs     = sold.reduce((s, i) => s + i.buyPrice, 0);
  const fees     = sold.reduce((s, i) => s + (i.feeAmount || 0), 0);
  const shipping = sold.reduce((s, i) => s + (i.shipping || 0), 0);
  const profit   = sold.reduce((s, i) => s + (i.netProfit || 0), 0);
  const taxOwed  = Math.max(0, profit) * 0.374;
  const invCost  = inv.reduce((s, i) => s + i.buyPrice, 0);

  const byPlatform = sold.reduce((acc, i) => {
    const p = i.platformSold || "Other";
    acc[p] = (acc[p] || 0) + (i.netProfit || 0);
    return acc;
  }, {});
  const platEntries = Object.entries(byPlatform).sort((a,b) => b[1]-a[1]);
  const maxP = platEntries[0]?.[1] || 1;
  const COLORS = { Swappa: "#4ade80", eBay: "#60a5fa", Facebook: "#8b7cf8", BankMyCell: "#fbbf24", Other: "#f87171" };

  const recent = [...sold].sort((a,b) => b.date.localeCompare(a.date)).slice(0,5);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 24, fontWeight:900, letterSpacing: "-0.5px" }}>Dashboard</div>
        <div style={{ fontSize: 13, color: "#9ba3c8", marginTop: 3 }}>Your iPhone flip empire at a glance</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 18 }}>
        <Metric label="Units sold" value={sold.length} sub="all time" color="#8b7cf8" />
        <Metric label="Total revenue" value={fmtUSD(revenue)} sub="gross" />
        <Metric label="Net profit" value={fmtUSD(profit)} color={profit >= 0 ? "#4ade80" : "#f87171"} sub={profit > 0 ? pct((profit/revenue)*100) + " margin" : ""} />
        <Metric label="Tax owed" value={fmtUSD(taxOwed)} color="#f87171" sub="est. 37.4%" />
        <Metric label="In inventory" value={inv.length} sub={fmtUSD(invCost) + " tied up"} color="#fbbf24" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <SectionTitle>Profit by platform</SectionTitle>
          {platEntries.length === 0 ? <div style={{ color: "#9ba3c8", fontSize: 13 }}>No sales yet</div> :
            platEntries.map(([p, val]) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 76, fontSize: 12, color: "#9ca3af", flexShrink: 0 }}>{p}</span>
                <div style={{ flex: 1, background: "#f7f8ff", borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: Math.round((val/maxP)*100)+"%", background: COLORS[p]||"#7b6cf6", borderRadius: 4, transition: "width 0.5s ease" }} />
                </div>
                <span style={{ fontSize: 12, fontFamily: "'DM Mono',monospace", fontWeight:800, color: COLORS[p]||"#7b6cf6", minWidth: 50, textAlign: "right" }}>{fmtUSD(val)}</span>
              </div>
            ))
          }
        </Card>

        <Card>
          <SectionTitle>Business snapshot</SectionTitle>
          {[
            ["Avg buy price",   fmtUSD(sold.length ? cogs/sold.length : 0)],
            ["Avg sell price",  fmtUSD(sold.length ? revenue/sold.length : 0)],
            ["Avg profit/unit", fmtUSD(sold.length ? profit/sold.length : 0)],
            ["ROI",             cogs > 0 ? pct((profit/cogs)*100) : "—"],
            ["Inventory value", fmtUSD(invCost)],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1e1e2e" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{l}</span>
              <span style={{ fontSize: 13, fontFamily: "'DM Mono',monospace", fontWeight:800 }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionTitle>Recent sales</SectionTitle>
          <Btn variant="ghost" onClick={() => setPage("transactions")} style={{ fontSize: 12, padding: "5px 12px" }}>View all →</Btn>
        </div>
        {recent.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "#9ba3c8" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
            <Btn variant="primary" onClick={() => setPage("add")}>Add your first sale</Btn>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Date","Model","Cond","Buy","Sell","Platform","Profit"].map(h => (
                  <th key={h} style={{ fontSize: 10, color: "#9ba3c8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 10px", textAlign: "left", borderBottom: "1px solid #1e1e2e", fontWeight:800 }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {recent.map(i => (
                  <tr key={i.id} style={{ borderBottom: "1px solid #111118" }}>
                    <td style={{ padding: "8px 10px", fontSize: 12, color: "#9ba3c8", fontFamily: "'DM Mono',monospace" }}>{i.date}</td>
                    <td style={{ padding: "8px 10px", fontSize: 13, fontWeight:700 }}>{i.model} {i.storage}</td>
                    <td style={{ padding: "8px 10px" }}><Badge type={i.condition==="Mint"?"green":i.condition==="Fair"?"amber":"blue"}>{i.condition}</Badge></td>
                    <td style={{ padding: "8px 10px", fontSize: 13, color: "#f87171", fontFamily: "'DM Mono',monospace" }}>{fmtUSD(i.buyPrice)}</td>
                    <td style={{ padding: "8px 10px", fontSize: 13, fontFamily: "'DM Mono',monospace" }}>{fmtUSD(i.sellPrice)}</td>
                    <td style={{ padding: "8px 10px", fontSize: 12, color: "#9ca3af" }}>{i.platformSold}</td>
                    <td style={{ padding: "8px 10px", fontSize: 13, color: "#4ade80", fontFamily: "'DM Mono',monospace", fontWeight:900 }}>{fmtUSD(i.netProfit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function Inventory({ items, setItems, setPage }) {
  const inv = items.filter(i => i.status === "inventory");
  const [selling, setSelling] = useState(null);
  const [sellForm, setSellForm] = useState({ sellPrice: "", platformSold: "Swappa", shipping: "12", date: today() });

  function markSold() {
    if (!sellForm.sellPrice) return;
    setItems(prev => prev.map(item => {
      if (item.id !== selling) return item;
      const sp = Number(sellForm.sellPrice);
      const fee = (FEE_RATES[sellForm.platformSold] ?? 0.05) * sp;
      const ship = Number(sellForm.shipping) || 0;
      return { ...item, status: "sold", sellPrice: sp, platformSold: sellForm.platformSold, shipping: ship, feeAmount: Math.round(fee*100)/100, netProfit: Math.round((sp - item.buyPrice - fee - ship)*100)/100, date: sellForm.date };
    }));
    setSelling(null);
  }

  function remove(id) { setItems(prev => prev.filter(i => i.id !== id)); }

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight:900, letterSpacing: "-0.5px" }}>Inventory</div>
          <div style={{ fontSize: 13, color: "#9ba3c8", marginTop: 3 }}>{inv.length} units on hand</div>
        </div>
        <Btn variant="primary" onClick={() => setPage("add")}>+ Add unit</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 18 }}>
        <Metric label="Units on hand" value={inv.length} color="#fbbf24" />
        <Metric label="Capital tied up" value={fmtUSD(inv.reduce((s,i)=>s+i.buyPrice,0))} />
        <Metric label="Avg buy price" value={fmtUSD(inv.length ? inv.reduce((s,i)=>s+i.buyPrice,0)/inv.length : 0)} small />
        <Metric label="Est. sell value" value={fmtUSD(inv.reduce((s,i)=>s+i.buyPrice*1.35,0))} sub="@ 35% margin" color="#4ade80" small />
      </div>

      {inv.length === 0 ? (
        <Card><div style={{ textAlign: "center", padding: "40px 0", color: "#9ba3c8" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
          <div style={{ marginBottom: 16 }}>No units in inventory</div>
          <Btn variant="primary" onClick={() => setPage("add")}>Add a unit</Btn>
        </div></Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
          {inv.map(item => (
            <div key={item.id} style={{ background: "#ffffff", border: "1px solid #1e1e2e", borderRadius: 14, padding: "16px 18px", transition: "border-color 0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight:800, fontSize: 14 }}>{item.model}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.storage} · {item.date}</div>
                </div>
                <Badge type={item.condition==="Mint"?"green":item.condition==="Fair"?"amber":"blue"}>{item.condition}</Badge>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div><div style={{ fontSize: 10, color: "#9ba3c8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Paid</div>
                  <div style={{ fontSize: 18, fontWeight:900, fontFamily: "'DM Mono',monospace", color: "#f87171" }}>{fmtUSD(item.buyPrice)}</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: "#9ba3c8", textTransform: "uppercase", letterSpacing: "0.06em" }}>From</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>{item.platformBought}</div></div>
              </div>
              {item.notes && <div style={{ fontSize: 12, color: "#9ba3c8", marginBottom: 12, fontStyle: "italic" }}>{item.notes}</div>}
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="success" onClick={() => { setSelling(item.id); setSellForm({ sellPrice: "", platformSold: "Swappa", shipping: "12", date: today() }); }} style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>Mark sold</Btn>
                <Btn variant="danger" onClick={() => remove(item.id)} style={{ fontSize: 12 }}>✕</Btn>
              </div>
            </div>
          ))}
        </div>
      )}

      {selling && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: "#ffffff", border: "1px solid #1e1e2e", borderRadius: 16, padding: 28, width: 340 }}>
            <div style={{ fontSize: 17, fontWeight:900, marginBottom: 18 }}>Record sale</div>
            <Input label="Sell price ($)" type="number" value={sellForm.sellPrice} onChange={e => setSellForm(f => ({ ...f, sellPrice: e.target.value }))} placeholder="849" />
            <Select label="Sold on" value={sellForm.platformSold} onChange={e => setSellForm(f => ({ ...f, platformSold: e.target.value }))}>
              {Object.keys(FEE_RATES).map(p => <option key={p}>{p}</option>)}
            </Select>
            <Input label="Shipping cost ($)" type="number" value={sellForm.shipping} onChange={e => setSellForm(f => ({ ...f, shipping: e.target.value }))} />
            <Input label="Sale date" type="date" value={sellForm.date} onChange={e => setSellForm(f => ({ ...f, date: e.target.value }))} />
            {sellForm.sellPrice && (
              <div style={{ background: "#0d2818", border: "1px solid #14532d", borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#6b7280" }}>Net profit</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontWeight:900, color: "#4ade80" }}>
                  {fmtUSD2(Number(sellForm.sellPrice) - (items.find(i=>i.id===selling)?.buyPrice||0) - (FEE_RATES[sellForm.platformSold]??0.05)*Number(sellForm.sellPrice) - Number(sellForm.shipping||0))}
                </span>
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="success" onClick={markSold} style={{ flex: 1, justifyContent: "center" }}>Confirm sale</Btn>
              <Btn variant="ghost" onClick={() => setSelling(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Transactions({ items, setItems }) {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = items.filter(i => {
    const ms = [i.model, i.storage, i.condition, i.platformSold, i.platformBought, i.notes].join(" ").toLowerCase();
    return (!search || ms.includes(search.toLowerCase()))
      && (platform === "all" || i.platformSold === platform || i.platformBought === platform)
      && (status === "all" || i.status === status);
  });

  const platforms = [...new Set(items.flatMap(i => [i.platformSold, i.platformBought].filter(Boolean)))];

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ fontSize: 24, fontWeight:900, letterSpacing: "-0.5px", marginBottom: 4 }}>Transactions</div>
      <div style={{ fontSize: 13, color: "#9ba3c8", marginBottom: 18 }}>{filtered.length} of {items.length} records</div>

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search model, platform, notes..." style={{ flex: 2, minWidth: 180, background: "#f7f8ff", border: "1px solid #1e1e2e", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#0d0f2b", fontFamily: "inherit", outline: "none" }} />
        <select value={platform} onChange={e=>setPlatform(e.target.value)} style={{ flex: 1, minWidth: 130, background: "#f7f8ff", border: "1px solid #1e1e2e", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#0d0f2b", fontFamily: "inherit", outline: "none" }}>
          <option value="all">All platforms</option>
          {platforms.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={status} onChange={e=>setStatus(e.target.value)} style={{ flex: 1, minWidth: 110, background: "#f7f8ff", border: "1px solid #1e1e2e", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#0d0f2b", fontFamily: "inherit", outline: "none" }}>
          <option value="all">All status</option>
          <option value="sold">Sold</option>
          <option value="inventory">Inventory</option>
        </select>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f8ff" }}>
                {["Date","Model","Storage","Cond","Buy","Sell","Platform","Fees","Ship","Profit","Status",""].map(h => (
                  <th key={h} style={{ fontSize: 10, color: "#9ba3c8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "10px 12px", textAlign: "left", borderBottom: "1px solid #1e1e2e", fontWeight:800, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={12} style={{ textAlign: "center", padding: "32px 0", color: "#9ba3c8", fontSize: 13 }}>No results</td></tr>}
              {filtered.map(i => (
                <tr key={i.id} style={{ borderBottom: "1px solid #0d0d14" }}>
                  <td style={{ padding: "9px 12px", fontSize: 12, color: "#9ba3c8", fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" }}>{i.date}</td>
                  <td style={{ padding: "9px 12px", fontSize: 13, fontWeight:700, whiteSpace: "nowrap" }}>{i.model}</td>
                  <td style={{ padding: "9px 12px", fontSize: 12, color: "#9ca3af", fontFamily: "'DM Mono',monospace" }}>{i.storage}</td>
                  <td style={{ padding: "9px 12px" }}><Badge type={i.condition==="Mint"?"green":i.condition==="Fair"?"amber":"blue"}>{i.condition}</Badge></td>
                  <td style={{ padding: "9px 12px", fontSize: 13, color: "#f87171", fontFamily: "'DM Mono',monospace" }}>{fmtUSD(i.buyPrice)}</td>
                  <td style={{ padding: "9px 12px", fontSize: 13, fontFamily: "'DM Mono',monospace" }}>{i.sellPrice ? fmtUSD(i.sellPrice) : "—"}</td>
                  <td style={{ padding: "9px 12px", fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{i.platformSold || i.platformBought}</td>
                  <td style={{ padding: "9px 12px", fontSize: 12, color: "#9ba3c8", fontFamily: "'DM Mono',monospace" }}>{i.feeAmount ? fmtUSD(i.feeAmount) : "—"}</td>
                  <td style={{ padding: "9px 12px", fontSize: 12, color: "#9ba3c8", fontFamily: "'DM Mono',monospace" }}>{fmtUSD(i.shipping)}</td>
                  <td style={{ padding: "9px 12px", fontSize: 13, color: i.netProfit >= 0 ? "#4ade80" : "#f87171", fontFamily: "'DM Mono',monospace", fontWeight:900 }}>{i.netProfit !== null ? fmtUSD(i.netProfit) : "—"}</td>
                  <td style={{ padding: "9px 12px" }}><Badge type={i.status==="sold"?"green":"amber"}>{i.status}</Badge></td>
                  <td style={{ padding: "9px 12px" }}>
                    <button onClick={() => setItems(prev=>prev.filter(x=>x.id!==i.id))} style={{ background: "none", border: "none", color: "#374151", cursor: "pointer", fontSize: 15, padding: "0 4px" }} title="Delete">✕</button>
                  </td>
                </tr>
              ))}
              {filtered.length > 0 && (
                <tr style={{ background: "#f7f8ff", borderTop: "1px solid #1e1e2e" }}>
                  <td colSpan={4} style={{ padding: "9px 12px", fontSize: 12, color: "#6b7280", fontWeight:800 }}>Total ({filtered.length})</td>
                  <td style={{ padding: "9px 12px", fontSize: 13, color: "#f87171", fontFamily: "'DM Mono',monospace", fontWeight:900 }}>{fmtUSD(filtered.reduce((s,i)=>s+i.buyPrice,0))}</td>
                  <td style={{ padding: "9px 12px", fontSize: 13, fontFamily: "'DM Mono',monospace", fontWeight:900 }}>{fmtUSD(filtered.reduce((s,i)=>s+(i.sellPrice||0),0))}</td>
                  <td colSpan={3} />
                  <td style={{ padding: "9px 12px", fontSize: 13, color: "#4ade80", fontFamily: "'DM Mono',monospace", fontWeight:900 }}>{fmtUSD(filtered.reduce((s,i)=>s+(i.netProfit||0),0))}</td>
                  <td colSpan={2} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TaxPage({ items }) {
  const [extras, setExtras] = useState({ homeOffice: "", mileage: "", equipment: "", other: "" });
  const [paid, setPaid] = useState([0,0,0,0]);

  const sold = items.filter(i => i.status === "sold");
  const revenue  = sold.reduce((s,i)=>s+(i.sellPrice||0),0);
  const cogs     = sold.reduce((s,i)=>s+i.buyPrice,0);
  const fees     = sold.reduce((s,i)=>s+(i.feeAmount||0),0);
  const shipping = sold.reduce((s,i)=>s+(i.shipping||0),0);
  const extraTotal = Object.values(extras).reduce((s,v)=>s+(Number(v)||0),0);
  const netProfit  = revenue - cogs - fees - shipping - extraTotal;
  const seTax = Math.max(0,netProfit)*0.153;
  const seDed = seTax*0.5;
  const adjIncome = netProfit - seDed;
  const fedTax = federalTax(Math.max(0,adjIncome));
  const totalTax = seTax + fedTax;
  const effRate = netProfit>0 ? (totalTax/netProfit)*100 : 0;
  const takeHome = netProfit - totalTax;
  const qPayment = totalTax/4;
  const totalPaid = paid.reduce((s,v)=>s+(Number(v)||0),0);

  const QUARTERS = [
    {label:"Q1 (Jan–Mar)",due:"Apr 15, 2026"},
    {label:"Q2 (Apr–Jun)",due:"Jun 16, 2026"},
    {label:"Q3 (Jul–Sep)",due:"Sep 15, 2026"},
    {label:"Q4 (Oct–Dec)",due:"Jan 15, 2027"},
  ];

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ fontSize: 24, fontWeight:900, letterSpacing: "-0.5px", marginBottom: 4 }}>Tax calculator</div>
      <div style={{ fontSize: 13, color: "#9ba3c8", marginBottom: 18 }}>2026 IRS brackets — based on {sold.length} sold units</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 18 }}>
        <Metric label="Net profit" value={fmtUSD(netProfit)} color={netProfit>=0?"#4ade80":"#f87171"} />
        <Metric label="Total tax owed" value={fmtUSD(totalTax)} color="#f87171" />
        <Metric label="Effective rate" value={pct(effRate)} />
        <Metric label="Take-home" value={fmtUSD(takeHome)} color={takeHome>=0?"#4ade80":"#f87171"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <Card>
            <SectionTitle>Income statement</SectionTitle>
            {[["Gross revenue",revenue,false],["COGS (buy cost)",-cogs,true],["Platform fees",-fees,true],["Shipping costs",-shipping,true],["Extra deductions",-extraTotal,true]].map(([l,v,neg])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid #1e1e2e" }}>
                <span style={{ fontSize:13, color:"#6b7280" }}>{l}</span>
                <span style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:800, color: neg&&v!==0?"#f87171":"inherit" }}>{neg&&v!==0?"("+fmtUSD(-v)+")":fmtUSD(v)}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 2px" }}>
              <span style={{ fontSize:14, fontWeight:900 }}>Net profit</span>
              <span style={{ fontSize:16, fontFamily:"'DM Mono',monospace", fontWeight:900, color:netProfit>=0?"#4ade80":"#f87171" }}>{fmtUSD(netProfit)}</span>
            </div>
          </Card>
          <Card>
            <SectionTitle>Tax breakdown</SectionTitle>
            {[["Self-employment (15.3%)",seTax,"#f87171"],["SE deduction (50%)",-seDed,"#4ade80"],["Adjusted income",adjIncome,""],["Federal income tax",fedTax,"#f87171"]].map(([l,v,c])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid #1e1e2e" }}>
                <span style={{ fontSize:13, color:"#6b7280" }}>{l}</span>
                <span style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:800, color:c||"inherit" }}>{v<0?"("+fmtUSD2(-v)+")":fmtUSD2(v)}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 4px" }}>
              <span style={{ fontSize:14, fontWeight:900 }}>Total tax owed</span>
              <span style={{ fontSize:16, fontFamily:"'DM Mono',monospace", fontWeight:900, color:"#f87171" }}>{fmtUSD(totalTax)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"4px 0 2px" }}>
              <span style={{ fontSize:14, fontWeight:900, color:"#4ade80" }}>Take-home</span>
              <span style={{ fontSize:16, fontFamily:"'DM Mono',monospace", fontWeight:900, color:"#4ade80" }}>{fmtUSD(takeHome)}</span>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <SectionTitle>Extra deductions</SectionTitle>
            {[["Home office","homeOffice","Max $1,500 ($5/sqft)"],["Mileage","mileage","×72.5¢/mile in 2026"],["Equipment","equipment","Section 179 — full cost"],["Other","other","Supplies, software, etc."]].map(([l,k,h])=>(
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5, fontWeight:800 }}>{l} <span style={{ textTransform:"none", color:"#374151" }}>— {h}</span></div>
                <input type="number" min="0" value={extras[k]||""} onChange={e=>setExtras(p=>({...p,[k]:e.target.value}))} placeholder="0" style={{ width:"100%", background:"#f7f8ff", border:"1px solid #1e1e2e", borderRadius:8, padding:"8px 11px", fontSize:13, color:"#0d0f2b", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
              </div>
            ))}
          </Card>
          <Card>
            <SectionTitle>Quarterly payments</SectionTitle>
            <div style={{ background:"#f7f8ff", borderRadius:8, padding:"10px 14px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:12, color:"#6b7280" }}>Each quarter</span>
              <span style={{ fontSize:20, fontFamily:"'DM Mono',monospace", fontWeight:900 }}>{fmtUSD(qPayment)}</span>
            </div>
            {QUARTERS.map((q,i)=>(
              <div key={q.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #1e1e2e" }}>
                <div><div style={{ fontSize:13, fontWeight:800 }}>{q.label}</div><div style={{ fontSize:11, color:"#9ba3c8" }}>{q.due}</div></div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <input type="number" min="0" value={paid[i]||""} onChange={e=>setPaid(p=>{const n=[...p];n[i]=Number(e.target.value);return n;})} placeholder={fmtUSD(qPayment)} style={{ width:80, background:"#f7f8ff", border:"1px solid #1e1e2e", borderRadius:6, padding:"5px 8px", fontSize:12, fontFamily:"'DM Mono',monospace", color:"#0d0f2b", outline:"none" }} />
                  <Badge type={paid[i]>=qPayment*0.95?"green":paid[i]>0?"amber":"gray"}>{paid[i]>=qPayment*0.95?"Paid":paid[i]>0?"Partial":"Due"}</Badge>
                </div>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 0", borderTop:"1px solid #1e1e2e", marginTop:4 }}>
              <span style={{ fontSize:13, fontWeight:900 }}>Balance remaining</span>
              <span style={{ fontSize:15, fontFamily:"'DM Mono',monospace", fontWeight:900, color:totalTax-totalPaid>0?"#f87171":"#4ade80" }}>{fmtUSD(totalTax-totalPaid)}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AnnualIncome({ items }) {
  const year = new Date().getFullYear();
  const sold = items.filter(i => i.status === "sold");
  const months = Array.from({length:12},(_,mi)=>{
    const monthItems = sold.filter(i=>i.date && Number(i.date.split("-")[1])-1===mi);
    const rev = monthItems.reduce((s,i)=>s+(i.sellPrice||0),0);
    const cogs = monthItems.reduce((s,i)=>s+i.buyPrice,0);
    const fees = monthItems.reduce((s,i)=>s+(i.feeAmount||0),0);
    const ship = monthItems.reduce((s,i)=>s+(i.shipping||0),0);
    const profit = rev-cogs-fees-ship;
    return { month: MONTHS[mi], units: monthItems.length, rev, cogs, fees, ship, profit };
  });

  const totals = months.reduce((acc,m)=>({ units:acc.units+m.units, rev:acc.rev+m.rev, cogs:acc.cogs+m.cogs, fees:acc.fees+m.fees, ship:acc.ship+m.ship, profit:acc.profit+m.profit }),{ units:0, rev:0, cogs:0, fees:0, ship:0, profit:0 });
  const seTax = Math.max(0,totals.profit)*0.153;
  const seDed = seTax*0.5;
  const fedTax = federalTax(Math.max(0,totals.profit-seDed));
  const totalTax = seTax+fedTax;
  const maxRev = Math.max(...months.map(m=>m.rev),1);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ fontSize: 24, fontWeight:900, letterSpacing: "-0.5px", marginBottom: 4 }}>Annual income statement</div>
      <div style={{ fontSize: 13, color: "#9ba3c8", marginBottom: 18 }}>Full year {year} overview</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 18 }}>
        <Metric label="Annual revenue" value={fmtUSD(totals.rev)} />
        <Metric label="Gross profit" value={fmtUSD(totals.profit)} color={totals.profit>=0?"#4ade80":"#f87171"} />
        <Metric label="Total tax" value={fmtUSD(totalTax)} color="#f87171" />
        <Metric label="Net take-home" value={fmtUSD(totals.profit-totalTax)} color={totals.profit-totalTax>=0?"#4ade80":"#f87171"} />
        <Metric label="Units sold" value={totals.units} color="#8b7cf8" />
      </div>

      <Card>
        <SectionTitle>Revenue chart — {year}</SectionTitle>
        <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80, marginBottom:6 }}>
          {months.map(m=>(
            <div key={m.month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ width:"100%", background: m.profit>=0?"#0d2818":"#2d0f14", borderRadius:"3px 3px 0 0", height: Math.max(4,Math.round((m.rev/maxRev)*72)), display:"flex", alignItems:"flex-end", justifyContent:"center", overflow:"hidden", minWidth:0 }}>
                <div style={{ width:"50%", background:m.profit>=0?"#4ade80":"#f87171", height:"100%", borderRadius:"2px 2px 0 0" }} />
              </div>
              <span style={{ fontSize:9, color:"#9ba3c8", fontWeight:800 }}>{m.month}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#f7f8ff" }}>
                {["Month","Units","Revenue","COGS","Fees","Shipping","Gross Profit","Tax (40%)","Net"].map(h=>(
                  <th key={h} style={{ fontSize:10, color:"#9ba3c8", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 12px", textAlign:"right", borderBottom:"1px solid #1e1e2e", fontWeight:800, whiteSpace:"nowrap" }}>{h==="Month"?<span style={{textAlign:"left",display:"block"}}>{h}</span>:h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {months.map(m=>(
                <tr key={m.month} style={{ borderBottom:"1px solid #0d0d14", opacity: m.units===0?0.35:1 }}>
                  <td style={{ padding:"8px 12px", fontSize:13, fontWeight:800 }}>{m.month}</td>
                  {[m.units,m.rev,m.cogs,m.fees,m.ship,m.profit,m.profit*0.4,m.profit-m.profit*0.4].map((v,vi)=>(
                    <td key={vi} style={{ padding:"8px 12px", fontSize:12, fontFamily:"'DM Mono',monospace", textAlign:"right", color: vi===5||vi===7 ? (v>=0?"#4ade80":"#f87171") : vi===6?"#f87171":"inherit", fontWeight: vi>=5?600:400 }}>
                      {vi===0?v:fmtUSD(v)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ background:"#f7f8ff", borderTop:"1px solid #1e1e2e" }}>
                <td style={{ padding:"10px 12px", fontSize:13, fontWeight:900 }}>TOTAL</td>
                {[totals.units,totals.rev,totals.cogs,totals.fees,totals.ship,totals.profit,totals.profit*0.4,totals.profit-totals.profit*0.4].map((v,vi)=>(
                  <td key={vi} style={{ padding:"10px 12px", fontSize:13, fontFamily:"'DM Mono',monospace", textAlign:"right", color: vi===5||vi===7?(v>=0?"#4ade80":"#f87171"):vi===6?"#f87171":"inherit", fontWeight:900 }}>
                    {vi===0?v:fmtUSD(v)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle>Schedule C — Form 1040 mapping</SectionTitle>
        {[
          ["Line 1 – Gross receipts",   "Total revenue",        fmtUSD(totals.rev)],
          ["Line 4 – COGS",             "Buy cost of all units",fmtUSD(totals.cogs)],
          ["Line 10 – Commissions",     "Platform fees",        fmtUSD(totals.fees)],
          ["Line 22 – Supplies",        "Shipping & packaging", fmtUSD(totals.ship)],
          ["Line 28 – Net profit",      "→ Form 1040 Line 8",   fmtUSD(totals.profit)],
          ["SE Tax (Schedule SE)",      "15.3% of net profit",  fmtUSD(seTax)],
          ["Federal income tax",        "2026 brackets",        fmtUSD(fedTax)],
        ].map(([l,d,v])=>(
          <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #1e1e2e" }}>
            <div><div style={{ fontSize:12, fontFamily:"'DM Mono',monospace", color:"#7b6cf6", fontWeight:800 }}>{l}</div><div style={{ fontSize:11, color:"#9ba3c8", marginTop:1 }}>{d}</div></div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:900, fontSize:14 }}>{v}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function MonthlyLog({ items }) {
  const [selMonth, setSelMonth] = useState(new Date().getMonth());
  const [selYear]  = useState(new Date().getFullYear());
  const sold = items.filter(i => i.status === "sold");

  const monthItems = sold.filter(i => i.date && Number(i.date.split("-")[0])===selYear && Number(i.date.split("-")[1])-1===selMonth);
  const rev  = monthItems.reduce((s,i)=>s+(i.sellPrice||0),0);
  const cogs = monthItems.reduce((s,i)=>s+i.buyPrice,0);
  const fees = monthItems.reduce((s,i)=>s+(i.feeAmount||0),0);
  const ship = monthItems.reduce((s,i)=>s+(i.shipping||0),0);
  const profit = rev-cogs-fees-ship;

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ fontSize: 24, fontWeight:900, letterSpacing: "-0.5px", marginBottom: 4 }}>Monthly log</div>
      <div style={{ fontSize: 13, color: "#9ba3c8", marginBottom: 18 }}>Detailed breakdown by month</div>

      <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
        {MONTHS.map((m,i)=>(
          <button key={m} onClick={()=>setSelMonth(i)} style={{ padding:"6px 14px", borderRadius:20, border: i===selMonth?"1px solid #6366f1":"1px solid #1e1e2e", background: i===selMonth?"rgba(99,102,241,0.15)":"transparent", color: i===selMonth?"#8b7cf8":"#6b7280", fontSize:13, fontWeight:800, cursor:"pointer", transition:"all 0.15s" }}>{m}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10, marginBottom: 18 }}>
        <Metric label="Units sold" value={monthItems.length} color="#8b7cf8" />
        <Metric label="Revenue" value={fmtUSD(rev)} />
        <Metric label="Gross profit" value={fmtUSD(profit)} color={profit>=0?"#4ade80":"#f87171"} />
        <Metric label="Tax est." value={fmtUSD(profit*0.374)} color="#f87171" small />
        <Metric label="Take-home" value={fmtUSD(profit-profit*0.374)} color={profit>=0?"#4ade80":"#f87171"} small />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        <Card>
          <SectionTitle>{MONTHS[selMonth]} income statement</SectionTitle>
          {[["Revenue",rev],["COGS",-cogs],["Fees",-fees],["Shipping",-ship]].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid #1e1e2e" }}>
              <span style={{ fontSize:13, color:"#6b7280" }}>{l}</span>
              <span style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:800, color:v<0?"#f87171":"inherit" }}>{v<0?"("+fmtUSD(-v)+")":fmtUSD(v)}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 2px" }}>
            <span style={{ fontWeight:900 }}>Net profit</span>
            <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:900, fontSize:16, color:profit>=0?"#4ade80":"#f87171" }}>{fmtUSD(profit)}</span>
          </div>
        </Card>
        <Card>
          <SectionTitle>Platform breakdown</SectionTitle>
          {Object.entries(monthItems.reduce((acc,i)=>{const p=i.platformSold||"Other";if(!acc[p])acc[p]={units:0,profit:0};acc[p].units++;acc[p].profit+=i.netProfit||0;return acc;},{})).map(([p,d])=>(
            <div key={p} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid #1e1e2e" }}>
              <span style={{ fontSize:13, color:"#9ca3af" }}>{p} <span style={{ color:"#9ba3c8", fontSize:11 }}>({d.units})</span></span>
              <span style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:800, color:d.profit>=0?"#4ade80":"#f87171" }}>{fmtUSD(d.profit)}</span>
            </div>
          ))}
          {monthItems.length===0&&<div style={{ color:"#9ba3c8", fontSize:13 }}>No sales this month</div>}
        </Card>
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"16px 20px 0" }}><SectionTitle>All {MONTHS[selMonth]} transactions</SectionTitle></div>
        {monthItems.length===0 ? (
          <div style={{ textAlign:"center", padding:"32px 0", color:"#9ba3c8", fontSize:13 }}>No sales recorded for {MONTHS[selMonth]}</div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#f7f8ff" }}>
                {["Date","Model","Storage","Cond","Buy","Sell","Platform","Profit"].map(h=>(
                  <th key={h} style={{ fontSize:10, color:"#9ba3c8", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 12px", textAlign:"left", borderBottom:"1px solid #1e1e2e", fontWeight:800, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {monthItems.map(i=>(
                  <tr key={i.id} style={{ borderBottom:"1px solid #0d0d14" }}>
                    <td style={{ padding:"9px 12px", fontSize:12, color:"#9ba3c8", fontFamily:"'DM Mono',monospace" }}>{i.date}</td>
                    <td style={{ padding:"9px 12px", fontSize:13, fontWeight:700 }}>{i.model}</td>
                    <td style={{ padding:"9px 12px", fontSize:12, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{i.storage}</td>
                    <td style={{ padding:"9px 12px" }}><Badge type={i.condition==="Mint"?"green":i.condition==="Fair"?"amber":"blue"}>{i.condition}</Badge></td>
                    <td style={{ padding:"9px 12px", fontSize:13, color:"#f87171", fontFamily:"'DM Mono',monospace" }}>{fmtUSD(i.buyPrice)}</td>
                    <td style={{ padding:"9px 12px", fontSize:13, fontFamily:"'DM Mono',monospace" }}>{fmtUSD(i.sellPrice)}</td>
                    <td style={{ padding:"9px 12px", fontSize:12, color:"#9ca3af" }}>{i.platformSold}</td>
                    <td style={{ padding:"9px 12px", fontSize:13, color:"#4ade80", fontFamily:"'DM Mono',monospace", fontWeight:900 }}>{fmtUSD(i.netProfit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function AddUnit({ setItems, setPage }) {
  const empty = { date: today(), model: "iPhone 16 Pro Max", storage: "256GB", condition: "Good", buyPrice: "", sellPrice: "", platformBought: "Swappa", platformSold: "", shipping: "12", notes: "", status: "inventory" };
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(false);

  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const isSale = form.status === "sold";
  const buyP = Number(form.buyPrice)||0;
  const sellP = Number(form.sellPrice)||0;
  const feeRate = FEE_RATES[form.platformSold]??0.05;
  const feeAmt = isSale ? Math.round(sellP*feeRate*100)/100 : 0;
  const ship = Number(form.shipping)||0;
  const netProfit = isSale ? Math.round((sellP-buyP-feeAmt-ship)*100)/100 : null;

  function save() {
    if (!form.buyPrice) return;
    const id = "u" + Date.now();
    const item = calcItem({ ...form, id, buyPrice: buyP, sellPrice: isSale?sellP:null, shipping: ship, feeAmount: feeAmt, netProfit, platformSold: isSale?form.platformSold:null });
    setItems(p=>[...p, item]);
    setDone(true);
  }

  if (done) return (
    <div style={{ textAlign:"center", padding:"60px 24px", animation:"fadeUp 0.3s ease" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>✓</div>
      <div style={{ fontSize:22, fontWeight:900, marginBottom:8 }}>{isSale?"Sale recorded!":"Added to inventory!"}</div>
      {isSale && <div style={{ color:"#9ba3c8", marginBottom:24 }}>Net profit: <span style={{ color:"#4ade80", fontFamily:"'DM Mono',monospace", fontWeight:900 }}>{fmtUSD2(netProfit)}</span></div>}
      <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
        <Btn variant="primary" onClick={()=>{setDone(false);setForm(empty);}}>Add another</Btn>
        <Btn variant="ghost" onClick={()=>setPage(isSale?"transactions":"inventory")}>View {isSale?"transactions":"inventory"}</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ animation:"fadeUp 0.3s ease", maxWidth:520 }}>
      <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.5px", marginBottom:4 }}>Add unit</div>
      <div style={{ fontSize:13, color:"#9ba3c8", marginBottom:18 }}>Log a purchase or completed sale</div>

      <Card>
        <div style={{ display:"flex", gap:4, marginBottom:18, background:"#f7f8ff", borderRadius:8, padding:4 }}>
          {[["inventory","📦 Add to inventory"],["sold","💰 Record sale"]].map(([v,l])=>(
            <button key={v} onClick={()=>set("status",v)} style={{ flex:1, padding:"8px", borderRadius:6, border:"none", background:form.status===v?"#7b6cf6":"transparent", color:form.status===v?"#fff":"#6b7280", fontSize:13, fontWeight:800, fontFamily:"inherit", cursor:"pointer", transition:"all 0.15s" }}>{l}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Input label="Date" type="date" value={form.date} onChange={e=>set("date",e.target.value)} />
          <Select label="Model" value={form.model} onChange={e=>set("model",e.target.value)}>
            {["iPhone 16 Pro Max","iPhone 16 Pro","iPhone 16","iPhone 15 Pro Max","iPhone 15 Pro","iPhone 14 Pro Max","iPhone 14 Pro"].map(m=><option key={m}>{m}</option>)}
          </Select>
          <Select label="Storage" value={form.storage} onChange={e=>set("storage",e.target.value)}>
            {["128GB","256GB","512GB","1TB"].map(s=><option key={s}>{s}</option>)}
          </Select>
          <Select label="Condition" value={form.condition} onChange={e=>set("condition",e.target.value)}>
            {["Mint","Good","Fair"].map(c=><option key={c}>{c}</option>)}
          </Select>
          <Select label="Bought from" value={form.platformBought} onChange={e=>set("platformBought",e.target.value)}>
            {["Swappa","eBay","Facebook","Craigslist","OfferUp","Other"].map(p=><option key={p}>{p}</option>)}
          </Select>
          <Input label="Buy price ($)" type="number" value={form.buyPrice} onChange={e=>set("buyPrice",e.target.value)} placeholder="616" />

          {isSale && <>
            <Select label="Sold on" value={form.platformSold} onChange={e=>set("platformSold",e.target.value)}>
              <option value="">Select platform</option>
              {Object.keys(FEE_RATES).map(p=><option key={p}>{p}</option>)}
            </Select>
            <Input label="Sell price ($)" type="number" value={form.sellPrice} onChange={e=>set("sellPrice",e.target.value)} placeholder="849" />
            <Input label="Shipping cost ($)" type="number" value={form.shipping} onChange={e=>set("shipping",e.target.value)} placeholder="12" />
          </>}
        </div>

        <Input label="Notes" value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="Battery health, cosmetic condition, buyer notes..." />

        {isSale && form.sellPrice && (
          <div style={{ background:"#0d2818", border:"1px solid #14532d", borderRadius:8, padding:"12px 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11, color:"#6b7280" }}>Estimated net profit</div>
              <div style={{ fontSize:11, color:"#374151", marginTop:2 }}>{fmtUSD(sellP)} − {fmtUSD(buyP)} buy − {fmtUSD2(feeAmt)} fee ({Math.round(feeRate*100)}%) − {fmtUSD(ship)} ship</div>
            </div>
            <div style={{ fontSize:22, fontFamily:"'DM Mono',monospace", fontWeight:900, color: netProfit>=0?"#4ade80":"#f87171" }}>{netProfit>=0?"+":""}{fmtUSD2(netProfit)}</div>
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          <Btn variant="primary" onClick={save} style={{ flex:1, justifyContent:"center", padding:"11px" }} disabled={!form.buyPrice}>
            {form.status==="inventory"?"Save to inventory":"Record sale"}
          </Btn>
          <Btn variant="ghost" onClick={()=>setPage("dashboard")}>Cancel</Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── main app ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",    icon: "▦", label: "Dashboard" },
  { id: "inventory",    icon: "◻", label: "Inventory" },
  { id: "transactions", icon: "≡", label: "Transactions" },
  { id: "tax",          icon: "◈", label: "Tax calculator" },
  { id: "annual",       icon: "◉", label: "Annual income" },
  { id: "monthly",      icon: "◷", label: "Monthly log" },
  { id: "add",          icon: "+", label: "Add unit" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [items, setItems] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : SEED.map(calcItem); }
    catch { return SEED.map(calcItem); }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;600&family=Sora:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#0a0a0f;color:#f0f0f5;font-family:'Sora',sans-serif;font-size:14px;font-weight:700;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:#0d0d14;}
        ::-webkit-scrollbar-thumb{background:#1e1e2e;border-radius:2px;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input,select,button{font-weight:700;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
      `}</style>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
        <aside style={{ width:210, flexShrink:0, background:"#f7f8ff", borderRight:"1px solid #1e1e2e", display:"flex", flexDirection:"column", height:"100vh" }}>
          <div style={{ padding:"20px 18px 14px", borderBottom:"1px solid #1e1e2e" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAEIAwoDASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAcIBQYJBAMCAf/EAFwQAAEDAwICBQUICQ8KBgMBAAEAAgMEBQYHERIhCDFBUWETFCJxgQkyN3WRobGzFRZCUnSUssHRFxgjMzY4U1VWYnJzgpLCNENUdpOVorTS0yQ1RFdj4SWD8KP/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EADgRAAICAgECAwUGBQIHAAAAAAABAgMEERIhMQVBURMUInGBBjJhkaGxM0JSwdHh8BUkNFNyovH/2gAMAwEAAhEDEQA/ALloiIAiIgCIq79LrXaLAbTJi2NVDH5JVx7Pe07+ZsP3R/nHsHtV663ZLigWHa5r2hzXBzT1EHcFf1Ud6JnSMnstZDhmd1z5rdO/ho6+V25gcT715+9J7exXghkjmibLE9r43gOa5p3BB7QrW0yqlpkJ7P0iIsRIREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREARFiMyyK24njFfkN3mEVHQwmWQ9p26gPEnkiW+gI+6TWrVHpbg8k0Esb77XNMdvgPMg9shHcPpXNW93S4Xq7VN1ulVJVVlTIZJpZHbuc4radZ9QrtqVnNZkNzkcI3OLKSDf0YYgfRaPzrSl28aj2Uevcxt7Cth0ROkQ+zS0uC5xWF9ueRHb66V25gPZG8/e9x7FU9FktqjZHiwno7GRvZJG2SNwexw3a4HcEL9KlXRC6Q7qF9LgecVhdTOIjt1fK79rPZG8ns7irqMc17A9jg5rhuCDyIXFtqlVLTLp7P6iIsRIREQBERAEReOqulspTtVXGjgI/hJmt+koD2IsLJluLxnZ+Q2tp8apn6V9YMkx6cgRXy2vJ6tqpn6VOmDKovxDNDMzjhlZI3vY4EfMv2oAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAVIuntqoLldotOrNU70tE4S3JzDyfL2M/s9virUa35tT6faaXbJJXtE0UJZStP3czuTR8vP2Llfdq+qulzqbjWyumqamV0sr3HcucTuSt/Cp5Pm/IrJnmREXUKBERAASCCDsR1FXE6IPSH4DS4FnNb6J2jt1fK75I3k/MVTtf1pLXBzSQQdwR2LHbVG2OmSno7GNIc0OaQQeYIX9VP+iF0iROKXAs6rdphtHbrhK73/AHRvPf3FXABBAIO4PUVxLapVy0y6ewi8t2uNDabdNcblVw0lJA0vkllcGtaB3kqm2vfS0qqiWqsGm7fIQAmN91kG7njqPk29nrKmqmVr1EN6LR6i6l4XgFC6pya+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V1xPJ7VKYrjj9zpXjrElM8bfMtqNkJdmRowqL9SRyRu4ZGOY4djhsV+VcgIiIAiL1UtuuFVt5rQ1U+/V5OJzvoCA8qLfcT0c1LyeVrbTiFyew/52WIxxj1ud1KacL6GWW1pZLlF+obVGduKKAeWkHt9786xTvrh3ZOmVZW6af6WZ3nNXHDj2PVk8bjsah7CyJniXHkr5ac9GjTDD/J1Etsde65nPy9eeJu/eGdQ9u6mOkpqekp2U9LBFBCwbNjjYGtaPABalmev5EW4lWtJOh/YrX5G4Z9Xm61Q2d5lTkthae5zutys1j9ktGP22O22S3U1vpIxs2KCMNb83WfFZBFoWWzsfxMtrQREWMBERAEREAREQBERAEREAREQH5mcWRPe1vE5rSQO/wUKXyLM9Sblb6OqsE1ntkEgfMZSQD3nmBuQN9h4qbUW7h5nurc4xTl5N+RWS2fKkp4qWlipoGBkUTAxjR2ADYL6oi029vbLBERQAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA1rP7/AHew0VNJaLHLdpZnlhYzf0OXInYFarpLi15jvlflmSwGGuqiRFG8+kwHrJHZ3KT0W7XmuuiVUIpOXd+bXoV47ewiItIsEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAX4miinjMc0TJGHra9oIPsKIgNfu2BYTdWkXDE7LUb9ZdRsDj7QN1rtVodpLU7+WwW0nfua5v0FEVlOS7MGMn6OejMruL7SaOPwZLIB+UvTS9H7Ryn2MeCW0kdrnSH6XIit7WfqxozFv0j0zoJBJS4TZmub1cVOH/lbraLdZbPbgBb7TQUe3V5CnZH9ARFVyb7sHvREVQEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//9k=" alt="AffordBuy" style={{ width:160, height:"auto", objectFit:"contain", display:"block" }} />
            </div>
          </div>
          <nav style={{ padding:"10px 8px", flex:1, overflowY:"auto" }}>
            <div style={{ fontSize:9, color:"#374151", textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:900, padding:"4px 10px 8px" }}>Navigation</div>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, border:"none", cursor:"pointer", background:page===n.id?"rgba(99,102,241,0.12)":"transparent", color:page===n.id?"#8b7cf8":"#6b7280", fontSize:13, fontFamily:"'Sora',sans-serif", fontWeight:page===n.id?600:400, marginBottom:2, transition:"all 0.12s", textAlign:"left" }}>
                <span style={{ width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", background:page===n.id?"rgba(99,102,241,0.2)":"#ffffff", borderRadius:6, fontSize:n.id==="add"?17:13, border:`1px solid ${page===n.id?"#7b6cf6":"#e8eaf5"}` }}>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div style={{ padding:"10px 8px", borderTop:"1px solid #1e1e2e" }}>
            <div style={{ padding:"10px 12px", borderRadius:8, background:"#ffffff", border:"1px solid #1e1e2e" }}>
              <div style={{ fontSize:11, color:"#374151", fontWeight:900 }}>Data stored locally</div>
              <div style={{ fontSize:10, color:"#9ba3c8", marginTop:2 }}>{items.filter(i=>i.status==="sold").length} sold · {items.filter(i=>i.status==="inventory").length} in stock</div>
            </div>
          </div>
        </aside>
        <main style={{ flex:1, overflowY:"auto", padding:"28px 32px", background:"#ffffff" }}>
          {page === "dashboard"    && <Dashboard items={items} setPage={setPage} />}
          {page === "inventory"    && <Inventory items={items} setItems={setItems} setPage={setPage} />}
          {page === "transactions" && <Transactions items={items} setItems={setItems} />}
          {page === "tax"          && <TaxPage items={items} />}
          {page === "annual"       && <AnnualIncome items={items} />}
          {page === "monthly"      && <MonthlyLog items={items} />}
          {page === "add"          && <AddUnit setItems={setItems} setPage={setPage} />}
        </main>
      </div>
    </>
  );
}
