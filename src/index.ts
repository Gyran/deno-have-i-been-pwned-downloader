import pMap from 'https://esm.sh/p-map';

const downloadRange = async (prefix: string) => {
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,
  );
  const content = await response.text();

  return content;
};

const downloadAndSaveRange = async (prefix: string, overwrite = false) => {
  const filePath = `./output/${prefix}.txt`;

  let doDownload;
  if (overwrite) {
    doDownload = true;
  } else {
    // check if file exists
    try {
      await Deno.stat(filePath);
      // file exists
      doDownload = false;
    } catch (error) {
      // files does not exists, download it
      doDownload = true;
    }
  }

  if (doDownload) {
    const content = await downloadRange(prefix);
    await Deno.writeTextFile(filePath, content);
  }

  console.log(`Done with prefix ${prefix}! Downloaded [${doDownload}]`);
};

function* makePrefixIterator(numChars: number) {
  const start = 0n;
  const end = BigInt(16 ** numChars);

  for (let i = start; i < end; i += 1n) {
    yield i.toString(16).padStart(numChars, '0');
  }

  return end;
}

const download = ({
  concurrency,
  overwrite,
}: {
  concurrency: number;
  overwrite: boolean;
}) => {
  const it = makePrefixIterator(5);
  pMap(
    it,
    (prefix) => {
      return downloadAndSaveRange(prefix, overwrite);
    },
    { concurrency },
  );
};

export default download;
