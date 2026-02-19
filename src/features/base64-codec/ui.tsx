'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import {
  TextInput,
  Button,
  Code,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@stylelist94/nine-beauty-actress';

const encodeBase64 = (text: string): string => {
  const bytes = new TextEncoder().encode(text);
  const binary = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join(
    '',
  );
  return btoa(binary);
};

const decodeBase64 = (encoded: string): string => {
  const binary = atob(encoded);
  const bytes = Uint8Array.from(binary, (ch) => ch.codePointAt(0) ?? 0);
  return new TextDecoder().decode(bytes);
};

const Base64Codec = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    if (!inputText) return;
    try {
      setResult(encodeBase64(inputText));
      setError(null);
    } catch {
      setError('인코딩 실패');
      setResult(null);
    }
  };

  const handleDecode = () => {
    if (!inputText) return;
    try {
      setResult(decodeBase64(inputText));
      setError(null);
    } catch {
      setError('유효하지 않은 Base64 문자열');
      setResult(null);
    }
  };

  const handleClickCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success('Copied!', {
        position: 'bottom-right',
        duration: 1000,
      });
    } catch {
      /* empty */
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>인코딩은</CardTitle>
        <CardDescription>Base64로 충분해</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <TextInput
          placeholder="텍스트 또는 Base64 문자열"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={handleEncode}
          >
            Encode
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={handleDecode}
          >
            Decode
          </Button>
        </div>
      </CardContent>

      {(result ?? error) && (
        <CardFooter className="flex flex-col items-end!">
          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <button type="button" onClick={handleClickCopy}>
              <Code>{result}</Code>
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default Base64Codec;
