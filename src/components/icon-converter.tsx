'use client';

import { useState, useTransition, useCallback, ChangeEvent } from 'react';
import { FileUpIcon, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { FileUploader } from '@stylelist94/nine-beauty-actress';

import { convertToICO } from '@/lib/actions';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Label from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const IconConverter = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [previewInfo, setPreviewInfo] = useState<{
    name: string;
    dataUrl: string;
  } | null>(null);

  const updatePreview = useCallback((file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewInfo({ name: file.name, dataUrl: reader.result as string });
    };
  }, []);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updatePreview(file);
    }
  };

  const convertAction = async (formData: FormData) => {
    const file = formData.get('icon') as File;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('5MB 이하 파일만 허용됩니다');
      return;
    }

    startTransition(async () => {
      try {
        const { success, data } = await convertToICO(file);

        if (success && data) {
          const link = document.createElement('a');
          link.href = `data:image/x-icon;base64,${data}`;
          link.download = 'favicon.ico';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        setErrorMessage((error as Error).message);
      } finally {
        setPreviewInfo(null);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Icon Converter</CardTitle>
        <CardDescription>아! 맞다 파비콘!</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-2">
        <form action={convertAction} className="flex flex-col w-full gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="somthing-icon">아이콘 이미지</Label>

            <FileUploader
              name="icon"
              accept="image/png"
              placeholder="somthing icon"
              id="somthing-icon"
              required
              onChange={handleChangeFile}
            >
              <div className="flex flex-col justify-center items-center gap-4 py-4 text-zinc-400 dark:text-zinc-500">
                {previewInfo ? (
                  <>
                    <div className="relative w-12 h-12 rounded-xs">
                      <Image
                        src={previewInfo.dataUrl}
                        alt="preview-icon"
                        fill
                        className=""
                      />
                    </div>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50">
                      {previewInfo.name}
                    </p>
                  </>
                ) : (
                  <>
                    <FileUpIcon size={28} />
                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className="text-sm">PNG 이미지를 여기에 끌어놓기</p>
                      <p className="text-sm">또는 클릭해서 업로드</p>
                    </div>
                  </>
                )}
              </div>
            </FileUploader>
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2Icon className="animate-spin" />}
              Convert to ICO
            </Button>

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IconConverter;
