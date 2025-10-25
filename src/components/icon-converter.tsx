'use client';

import type { IconConversionResult } from '@/types/icon-converter';

import { actions, type SafeResult } from 'astro:actions';
import { withState } from '@astrojs/react/actions';
import {
  useActionState,
  useState,
  useCallback,
  useEffect,
  type ChangeEvent,
} from 'react';
import { FileUpIcon, Loader2Icon } from 'lucide-react';

import { FileUploader } from '@stylelist94/nine-beauty-actress';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Label from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const initialConvertState: SafeResult<FormData, IconConversionResult> = {
  data: { iconData: '' },
  error: undefined,
};

const IconConverter = () => {
  const [state, formAction, isPending] = useActionState(
    withState(actions.convertToICO),
    initialConvertState,
  );

  const [previewInfo, setPreviewInfo] = useState<{
    name: string;
    dataUrl: string;
  } | null>(null);

  const [uploaderKey, setUploaderKey] = useState(0);

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

  useEffect(() => {
    if (state.data?.iconData) {
      const link = document.createElement('a');
      link.href = `data:image/x-icon;base64,${state.data.iconData}`;
      link.download = 'favicon.ico';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setPreviewInfo(null);
      setUploaderKey((prev) => prev + 1); // Force FileUploader remount
    }
  }, [state.data?.iconData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>아이콘 폼체인지</CardTitle>
        <CardDescription>아! 맞다 파비콘!</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-2">
        <form action={formAction} className="flex flex-col w-full gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="something-icon">아이콘 이미지</Label>

            <FileUploader
              key={uploaderKey}
              name="icon"
              accept="image/png"
              placeholder="something icon"
              id="something-icon"
              required
              onChange={handleChangeFile}
            >
              <div className="flex flex-col justify-center items-center gap-4 py-4 text-zinc-400 dark:text-zinc-500">
                {previewInfo ? (
                  <>
                    <div className="relative w-12 h-12 rounded-xs">
                      <img
                        src={previewInfo.dataUrl}
                        alt="preview-icon"
                        className="w-full h-full"
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
            <Button type="submit" disabled={isPending} variant="outline">
              {isPending && <Loader2Icon className="animate-spin" />}
              ICO 내놔!
            </Button>

            {state.error && (
              <p className="text-sm text-red-500">{state.error.message}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IconConverter;
