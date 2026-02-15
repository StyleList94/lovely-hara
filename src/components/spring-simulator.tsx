'use client';

import type { SpringOptions } from 'motion';

import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { LazyMotion, domAnimation, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { InfoIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TextInput,
  Slider,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Combobox,
} from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

type PresetOptionValue = 'scroll-linked';

type Option = {
  value: PresetOptionValue;
  label: string;
};

const presetOptions: Option[] = [
  { value: 'scroll-linked', label: 'Scroll linked' },
];

const presetGroup: Record<PresetOptionValue, SpringOptions> = {
  'scroll-linked': {
    stiffness: 150,
    damping: 30,
    mass: 1,
  },
};

const inputStyle =
  'w-20! h-7 text-sm text-right pr-0 border-transparent shadow-none dark:bg-transparent';

const SpringBox = ({ stiffness, damping, mass }: SpringOptions) => {
  const springOptions = useMemo(
    () => ({
      stiffness,
      damping,
      mass,
    }),
    [stiffness, damping, mass],
  );

  const x = useSpring(0, springOptions);

  useEffect(() => {
    x.set(64 * 4 - 16);
  }, [x]);

  return (
    <m.div
      key={`${stiffness}-${damping}-${mass}`}
      style={{ x }}
      className={cn(
        'relative w-8 h-8 rounded-full shadow-border',
        'bg-rose-200 border border-rose-100',
      )}
    />
  );
};

const SpringSimulator = () => {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  const [springOptions, setSpringOptions] = useState<SpringOptions>({
    stiffness,
    damping,
    mass,
  });

  const [selectedPreset, setSelectedPreset] = useState('');

  const handleChangeStiffness = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(1000, +e.target.value));
    setStiffness(value);
    setSpringOptions((prevState) => ({
      ...prevState,
      stiffness: value,
    }));
    setSelectedPreset('');
  };

  const handleChangeDamping = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, +e.target.value));
    setDamping(value);
    setSpringOptions((prevState) => ({
      ...prevState,
      damping: value,
    }));
    setSelectedPreset('');
  };

  const handleChangeMass = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, +e.target.value));
    setMass(value);
    setSpringOptions((prevState) => ({
      ...prevState,
      mass: value,
    }));
    setSelectedPreset('');
  };

  const handleChangeSlider = () => {
    setSpringOptions({ stiffness, mass, damping });
    setSelectedPreset('');
  };

  const handlePresetValueChange = (value: string) => {
    const nextSpringOption = presetGroup[value as PresetOptionValue];
    setStiffness(nextSpringOption.stiffness ?? 100);
    setDamping(nextSpringOption.damping ?? 10);
    setMass(nextSpringOption.mass ?? 10);

    setSpringOptions({ ...nextSpringOption });
    setSelectedPreset(value);
  };

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(springOptions, null, 2),
      );
      toast.success('Copied!', {
        position: 'bottom-right',
        duration: 1000,
      });
    } catch {
      toast.error('Failed to copy!', {
        position: 'bottom-right',
        duration: 1000,
      });
    }
  };

  return (
    <Card className="@container w-full">
      <CardHeader>
        <CardTitle>스프링 테스터</CardTitle>
        <CardDescription>통통 튀는 애니메이션 만들기!</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col @md:flex-row @md:items-end gap-4">
          <TooltipProvider delayDuration={300}>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-1">
                  <div className="flex items-center">
                    <label htmlFor="stiffness">Stiffness</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <InfoIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>스프링의 강성을 결정합니다.</p>
                        <p>값이 클수록 같은 힘을 가해도 덜 늘어납니다.</p>
                        <p>
                          값이 클수록 더 빨리 원래 위치로 돌아오려는 성질이
                          강해집니다.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <TextInput
                    id="stiffness"
                    type="number"
                    min={1}
                    max={1000}
                    className={inputStyle}
                    onChange={handleChangeStiffness}
                    value={stiffness}
                  />
                </div>
                <Slider
                  value={[stiffness]}
                  min={1}
                  max={1000}
                  step={1}
                  onValueChange={(value) => setStiffness(value[0])}
                  onValueCommit={handleChangeSlider}
                  onPointerUp={handleChangeSlider}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-1">
                  <div className="flex items-center">
                    <label htmlFor="damping">Damping</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <InfoIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>스프링의 진동이나 움직임의 정도를 결정합니다.</p>
                        <p>값이 클수록 진동이 빨리 멈춥니다.</p>
                        <p>값이 작을수록 진동이 오래 지속됩니다.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <TextInput
                    id="damping"
                    type="number"
                    min={1}
                    max={100}
                    className={inputStyle}
                    onChange={handleChangeDamping}
                    value={damping}
                  />
                </div>
                <Slider
                  value={[damping]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setDamping(value[0])}
                  onValueCommit={handleChangeSlider}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-1">
                  <div className="flex items-center">
                    <label htmlFor="mass">Mass</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <InfoIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>스프링 끝 지점의 질량을 결정합니다.</p>
                        <p>값이 클수록 같은 힘에 대해 움직임이 느려집니다.</p>
                        <p>값이 작아질수록 더 빠르고 민감하게 움직입니다.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <TextInput
                    id="mass"
                    type="number"
                    min={1}
                    max={100}
                    className={inputStyle}
                    onChange={handleChangeMass}
                    value={mass}
                  />
                </div>
                <Slider
                  value={[mass]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMass(value[0])}
                  onValueCommit={handleChangeSlider}
                />
              </div>
            </div>
          </TooltipProvider>
          <div className="flex flex-col justify-between gap-4 @md:w-72 h-full">
            <div className="flex flex-col gap-2 ">
              <Combobox
                value={selectedPreset}
                onValueChange={handlePresetValueChange}
                options={presetOptions}
                placeholder="프리셋"
                queryPlaceholder="프리셋 검색"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={handleClickCopy}>
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={() => setRetryCount((prevState) => prevState + 1)}
              >
                Replay
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-800 dark:text-zinc-200">
            놀랍게도 스프링(?)입니다.
          </p>
          <LazyMotion features={domAnimation}>
            <div
              className={cn(
                'overflow-hidden flex w-full p-0.5 rounded-xl',
                'border-4 border-zinc-200/30 dark:border-zinc-700/30',
              )}
            >
              <div className="relative flex flex-col justify-center items-start w-64 h-12">
                <div className="absolute h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                <SpringBox
                  key={`${springOptions.stiffness}-${springOptions.damping}-${springOptions.mass}-${retryCount}`}
                  {...springOptions}
                />
              </div>
            </div>
          </LazyMotion>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpringSimulator;
