import * as React from 'react';
import { CheckIcon, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/lib/cus/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/cus/popover';
import { Separator } from './separator';
import { Button } from './button';

type SelectOption = {
  value: string;
  label: string;
};

interface InputSelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  placeholder?: string;
}

const InputSelect = ({
  options,
  value = '',
  onValueChange,
  className,
  children,
  placeholder = 'Select an option',
}: InputSelectProps) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(value);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const onOptionSelect = (option: string) => {
    setSelectedValue(option);
    onValueChange?.(option);
    setIsPopoverOpen(false);
  };

  const onClearAllOptions = () => {
    setSelectedValue('');
    onValueChange?.('');
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsPopoverOpen((prev) => !prev)}
          variant="outline"
          type="button"
          hover={false}
          className="flex h-11 w-full items-center justify-between p-1 [&_svg]:pointer-events-auto border-black"
        >
          {selectedValue ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center px-3 text-foreground">
                {options.find((v) => v.value === selectedValue)?.value}
              </div>
              <div className="flex items-center justify-between">
                {selectedValue && (
                  <>
                    <X
                      className="mx-1 h-4 cursor-pointer text-muted-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearAllOptions();
                      }}
                    />
                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                  </>
                )}
                <ChevronDown className="h-4 mx-1 cursor-pointer text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="px-3 text-sm text-muted-foreground">{placeholder}</span>
              <ChevronDown className="h-4 mx-1 cursor-pointer text-muted-foreground" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-0', className)} align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-[unset] overflow-y-hidden">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[10rem] min-h-[10rem] overflow-y-auto">
              {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onOptionSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        'mr-1 flex h-4 w-4 items-center justify-center',
                        isSelected ? 'text-primary' : 'invisible'
                      )}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InputSelect;
