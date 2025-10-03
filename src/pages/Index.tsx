import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import * as React from "react";
import { Check, ChevronDown, ChevronUp, ChevronRight, Circle, X } from "lucide-react";
import { LayoutGrid, Table as TableIcon, Activity, BarChart3, Plus, Swords, Download, Upload, Users, TrendingUp, Globe, Target, Clock, MapPin, Trash2, User, Shield, Languages, Zap, Search, Map, Timer } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import * as XLSX from "xlsx";

// ==================== UTILITY FUNCTION ====================
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================== UI COMPONENTS (INLINE) ====================

// Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

// Card Components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

// Input Component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// Label Component
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

// Badge Component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Tabs Components
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Dialog Components
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Select Components
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Table Components
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

// DropdownMenu Components
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// ==================== TYPES ====================
export type Language = 'pt' | 'en' | 'es';

export interface Scout {
  id: string;
  mapa: string;
  turnoPrincipal: string;
  nick: string;
  poder: string;
  cla: string;
  idioma: string;
  funcaoWB: string;
  timestamp: string;
}

// ==================== LANGUAGE CONTEXT ====================
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    'header.title': 'Sistema de Scout MIR4',
    'header.subtitle': 'Rastreamento e Coordenação de World Bosses',
    'header.export': 'Exportar',
    'header.import': 'Importar',
    'dashboard.totalScouts': 'Total de Scouts',
    'dashboard.activeClans': 'Clãs Ativos',
    'dashboard.coveredMaps': 'Mapas Cobertos',
    'dashboard.languages': 'Idiomas',
    'dashboard.languageDistribution': 'Distribuição por Idioma',
    'dashboard.mainShifts': 'Turnos Principais',
    'tabs.dashboard': 'Dashboard',
    'tabs.cards': 'Cards',
    'tabs.table': 'Tabela',
    'tabs.timeline': 'Timeline',
    'tabs.newScout': 'Novo Scout',
    'filters.searchPlaceholder': 'Buscar scout...',
    'filters.clanPlaceholder': 'Filtrar por clã',
    'filters.language': 'Idioma',
    'filters.allLanguages': 'Todos os Idiomas',
    'filters.map': 'Mapa',
    'filters.allMaps': 'Todos os Mapas',
    'filters.shift': 'Turno',
    'filters.allShifts': 'Todos os Turnos',
    'filters.wbRolePlaceholder': 'Filtrar por função WB',
    'list.activeScouts': 'Scouts Ativos',
    'list.tableView': 'Visualização em Tabela',
    'list.timelineLine': 'Linha do Tempo',
    'form.title': 'Cadastrar Novo Scout',
    'form.nickname': 'Nickname',
    'form.clan': 'Clã',
    'form.map': 'Mapa',
    'form.language': 'Idioma',
    'form.mainShift': 'Turno Principal',
    'form.wbRole': 'Função no WB',
    'form.notes': 'Observações',
    'form.submit': 'Cadastrar Scout',
    'card.clan': 'Clã',
    'card.map': 'Mapa',
    'card.language': 'Idioma',
    'card.shift': 'Turno',
    'card.wbRole': 'Função WB',
    'card.notes': 'Obs',
    'card.delete': 'Deletar',
    'table.nickname': 'Nickname',
    'table.clan': 'Clã',
    'table.map': 'Mapa',
    'table.language': 'Idioma',
    'table.shift': 'Turno',
    'table.wbRole': 'Função WB',
    'table.notes': 'Observações',
    'table.actions': 'Ações',
    'common.morning': 'Manhã',
    'common.afternoon': 'Tarde',
    'common.night': 'Noite',
    'common.dawn': 'Madrugada',
  },
  en: {
    'header.title': 'MIR4 Scout System',
    'header.subtitle': 'World Boss Tracking and Coordination',
    'header.export': 'Export',
    'header.import': 'Import',
    'dashboard.totalScouts': 'Total Scouts',
    'dashboard.activeClans': 'Active Clans',
    'dashboard.coveredMaps': 'Covered Maps',
    'dashboard.languages': 'Languages',
    'dashboard.languageDistribution': 'Language Distribution',
    'dashboard.mainShifts': 'Main Shifts',
    'tabs.dashboard': 'Dashboard',
    'tabs.cards': 'Cards',
    'tabs.table': 'Table',
    'tabs.timeline': 'Timeline',
    'tabs.newScout': 'New Scout',
    'filters.searchPlaceholder': 'Search scout...',
    'filters.clanPlaceholder': 'Filter by clan',
    'filters.language': 'Language',
    'filters.allLanguages': 'All Languages',
    'filters.map': 'Map',
    'filters.allMaps': 'All Maps',
    'filters.shift': 'Shift',
    'filters.allShifts': 'All Shifts',
    'filters.wbRolePlaceholder': 'Filter by WB role',
    'list.activeScouts': 'Active Scouts',
    'list.tableView': 'Table View',
    'list.timelineLine': 'Timeline',
    'form.title': 'Register New Scout',
    'form.nickname': 'Nickname',
    'form.clan': 'Clan',
    'form.map': 'Map',
    'form.language': 'Language',
    'form.mainShift': 'Main Shift',
    'form.wbRole': 'WB Role',
    'form.notes': 'Notes',
    'form.submit': 'Register Scout',
    'card.clan': 'Clan',
    'card.map': 'Map',
    'card.language': 'Language',
    'card.shift': 'Shift',
    'card.wbRole': 'WB Role',
    'card.notes': 'Notes',
    'card.delete': 'Delete',
    'table.nickname': 'Nickname',
    'table.clan': 'Clan',
    'table.map': 'Map',
    'table.language': 'Language',
    'table.shift': 'Shift',
    'table.wbRole': 'WB Role',
    'table.notes': 'Notes',
    'table.actions': 'Actions',
    'common.morning': 'Morning',
    'common.afternoon': 'Afternoon',
    'common.night': 'Night',
    'common.dawn': 'Dawn',
  },
  es: {
    'header.title': 'Sistema de Scout MIR4',
    'header.subtitle': 'Rastreo y Coordinación de World Bosses',
    'header.export': 'Exportar',
    'header.import': 'Importar',
    'dashboard.totalScouts': 'Total de Scouts',
    'dashboard.activeClans': 'Clanes Activos',
    'dashboard.coveredMaps': 'Mapas Cubiertos',
    'dashboard.languages': 'Idiomas',
    'dashboard.languageDistribution': 'Distribución por Idioma',
    'dashboard.mainShifts': 'Turnos Principales',
    'tabs.dashboard': 'Dashboard',
    'tabs.cards': 'Tarjetas',
    'tabs.table': 'Tabla',
    'tabs.timeline': 'Línea de Tiempo',
    'tabs.newScout': 'Nuevo Scout',
    'filters.searchPlaceholder': 'Buscar scout...',
    'filters.clanPlaceholder': 'Filtrar por clan',
    'filters.language': 'Idioma',
    'filters.allLanguages': 'Todos los Idiomas',
    'filters.map': 'Mapa',
    'filters.allMaps': 'Todos los Mapas',
    'filters.shift': 'Turno',
    'filters.allShifts': 'Todos los Turnos',
    'filters.wbRolePlaceholder': 'Filtrar por función WB',
    'list.activeScouts': 'Scouts Activos',
    'list.tableView': 'Vista de Tabla',
    'list.timelineLine': 'Línea de Tiempo',
    'form.title': 'Registrar Nuevo Scout',
    'form.nickname': 'Nickname',
    'form.clan': 'Clan',
    'form.map': 'Mapa',
    'form.language': 'Idioma',
    'form.mainShift': 'Turno Principal',
    'form.wbRole': 'Función en WB',
    'form.notes': 'Observaciones',
    'form.submit': 'Registrar Scout',
    'card.clan': 'Clan',
    'card.map': 'Mapa',
    'card.language': 'Idioma',
    'card.shift': 'Turno',
    'card.wbRole': 'Función WB',
    'card.notes': 'Obs',
    'card.delete': 'Eliminar',
    'table.nickname': 'Nickname',
    'table.clan': 'Clan',
    'table.map': 'Mapa',
    'table.language': 'Idioma',
    'table.shift': 'Turno',
    'table.wbRole': 'Función WB',
    'table.notes': 'Observaciones',
    'table.actions': 'Acciones',
    'common.morning': 'Mañana',
    'common.afternoon': 'Tarde',
    'common.night': 'Noche',
    'common.dawn': 'Madrugada',
  },
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mir4-language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('mir4-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ==================== LANGUAGE SELECTOR COMPONENT ====================
const languages = [
  { code: 'pt' as Language, label: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, label: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find(l => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span>{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-accent' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ==================== HEADER COMPONENT ====================
interface HeaderProps {
  scouts: Scout[];
  onImport: (scouts: Scout[]) => void;
}

const Header = ({ scouts, onImport }: HeaderProps) => {
  const { t } = useLanguage();
  
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(scouts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scouts");
    XLSX.writeFile(workbook, `mir4-scouts-${new Date().toISOString().split('T')[0]}.xlsx`);
    sonnerToast.success("Dados exportados com sucesso!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const importedData = XLSX.utils.sheet_to_json(firstSheet) as any[];
        
        const importedScouts: Scout[] = importedData.map(item => ({
          id: item.id || crypto.randomUUID(),
          mapa: item.mapa || "",
          turnoPrincipal: item.turnoPrincipal || "",
          nick: item.nick || "",
          poder: item.poder || "",
          cla: item.cla || "",
          idioma: item.idioma || "PT",
          funcaoWB: item.funcaoWB || "",
          timestamp: item.timestamp || new Date().toISOString(),
        }));
        
        onImport(importedScouts);
        sonnerToast.success(`${importedScouts.length} scouts importados com sucesso!`);
      } catch (error) {
        sonnerToast.error("Erro ao importar dados. Verifique o formato do arquivo.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20 shadow-elevated">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary animate-pulse-glow">
              <Swords className="w-8 h-8 text-background" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-primary/40 hover:bg-primary/10"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('header.export')}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary/40 hover:bg-primary/10 relative"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('header.import')}</span>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// ==================== DASHBOARD COMPONENT ====================
interface DashboardProps {
  scouts: Scout[];
  onCardClick?: (filter: string) => void;
}

const Dashboard = ({ scouts, onCardClick }: DashboardProps) => {
  const { t } = useLanguage();
  
  const stats = {
    total: scouts.length,
    porIdioma: scouts.reduce((acc, scout) => {
      acc[scout.idioma] = (acc[scout.idioma] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    porTurno: scouts.reduce((acc, scout) => {
      if (scout.turnoPrincipal) {
        acc[scout.turnoPrincipal] = (acc[scout.turnoPrincipal] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>),
    clansUnicos: new Set(scouts.map(s => s.cla)).size,
    mapasUnicos: new Set(scouts.map(s => s.mapa)).size,
  };

  const statCards = [
    {
      title: t('dashboard.totalScouts'),
      value: stats.total,
      icon: Users,
      gradient: "from-primary to-accent",
      iconColor: "text-primary",
    },
    {
      title: t('dashboard.activeClans'),
      value: stats.clansUnicos,
      icon: Target,
      gradient: "from-secondary to-destructive",
      iconColor: "text-secondary",
    },
    {
      title: t('dashboard.coveredMaps'),
      value: stats.mapasUnicos,
      icon: Globe,
      gradient: "from-accent to-primary",
      iconColor: "text-accent",
    },
    {
      title: t('dashboard.languages'),
      value: Object.keys(stats.porIdioma).length,
      icon: TrendingUp,
      gradient: "from-destructive to-secondary",
      iconColor: "text-destructive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow overflow-hidden group cursor-pointer"
            onClick={() => onCardClick?.(stat.title)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold font-display bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4 text-foreground">{t('dashboard.languageDistribution')}</h3>
            <div className="space-y-3">
              {Object.entries(stats.porIdioma).map(([idioma, count]) => (
                <div key={idioma} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{idioma}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-foreground font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4 text-foreground">{t('dashboard.mainShifts')}</h3>
            <div className="space-y-3">
              {Object.entries(stats.porTurno).map(([turno, count]) => (
                <div key={turno} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{turno}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-secondary rounded-full transition-all"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-foreground font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ==================== SCOUT FORM COMPONENT ====================
interface ScoutFormProps {
  onAddScout: (scout: Scout) => void;
}

const ScoutForm = ({ onAddScout }: ScoutFormProps) => {
  const [formData, setFormData] = useState({
    mapa: "",
    turnoPrincipal: "",
    nick: "",
    poder: "",
    cla: "",
    idioma: "PT",
    funcaoWB: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.mapa || !formData.nick || !formData.cla) {
      sonnerToast.error("Preencha os campos obrigatórios: MAPA, NICK e CLÃ");
      return;
    }

    const newScout: Scout = {
      id: crypto.randomUUID(),
      ...formData,
      timestamp: new Date().toISOString(),
    };

    onAddScout(newScout);
    
    setFormData({
      mapa: "",
      turnoPrincipal: "",
      nick: "",
      poder: "",
      cla: "",
      idioma: "PT",
      funcaoWB: "",
    });

    sonnerToast.success("Scout cadastrado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mapa" className="text-foreground font-semibold">MAPA *</Label>
          <Input
            id="mapa"
            value={formData.mapa}
            onChange={(e) => setFormData({ ...formData, mapa: e.target.value })}
            placeholder="Ex: LAB BICHEON, LAB TOURO..."
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="turnoPrincipal" className="text-foreground font-semibold">Turno Principal</Label>
          <Select value={formData.turnoPrincipal} onValueChange={(value) => setFormData({ ...formData, turnoPrincipal: value })}>
            <SelectTrigger className="bg-muted border-border">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manhã">Manhã</SelectItem>
              <SelectItem value="Tarde">Tarde</SelectItem>
              <SelectItem value="Noite">Noite</SelectItem>
              <SelectItem value="Madrugada">Madrugada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nick" className="text-foreground font-semibold">NICK *</Label>
          <Input
            id="nick"
            value={formData.nick}
            onChange={(e) => setFormData({ ...formData, nick: e.target.value })}
            placeholder="Nome do jogador"
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="poder" className="text-foreground font-semibold">PODER</Label>
          <Input
            id="poder"
            value={formData.poder}
            onChange={(e) => setFormData({ ...formData, poder: e.target.value })}
            placeholder="Ex: 696,686"
            className="bg-muted border-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cla" className="text-foreground font-semibold">CLÃ *</Label>
          <Input
            id="cla"
            value={formData.cla}
            onChange={(e) => setFormData({ ...formData, cla: e.target.value })}
            placeholder="Nome do clã"
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idioma" className="text-foreground font-semibold">Idioma</Label>
          <Select value={formData.idioma} onValueChange={(value) => setFormData({ ...formData, idioma: value })}>
            <SelectTrigger className="bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PT">PT</SelectItem>
              <SelectItem value="EN">EN</SelectItem>
              <SelectItem value="ES">ES</SelectItem>
              <SelectItem value="CN">CN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="funcaoWB" className="text-foreground font-semibold">Função no WB</Label>
          <Input
            id="funcaoWB"
            value={formData.funcaoWB}
            onChange={(e) => setFormData({ ...formData, funcaoWB: e.target.value })}
            placeholder="Ex: Healer, Atribuído..."
            className="bg-muted border-border"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-display font-semibold shadow-card">
        Cadastrar Scout
      </Button>
    </form>
  );
};

// ==================== SCOUT LIST COMPONENT ====================
interface ScoutListProps {
  scouts: Scout[];
  onDeleteScout: (id: string) => void;
}

const ScoutList = ({ scouts, onDeleteScout }: ScoutListProps) => {
  if (scouts.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-lg">
        <Swords className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground text-lg">Nenhum scout cadastrado ainda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {scouts.map((scout, index) => {
        return (
          <Card
            key={scout.id}
            className="bg-gradient-card border-primary/30 hover:border-primary/60 transition-all hover:shadow-glow hover:scale-[1.02] overflow-hidden group relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative bg-gradient-primary p-4 pb-6">
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteScout(scout.id)}
                  className="h-8 w-8 hover:bg-background/20 text-background hover:text-background"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="relative z-0">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-background" />
                  <span className="text-xs font-medium text-background/80 uppercase tracking-wide">Localização</span>
                </div>
                <CardTitle className="text-2xl font-display text-background font-bold mb-3 pr-8">
                  {scout.mapa}
                </CardTitle>
                
                {scout.turnoPrincipal && (
                  <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-background/30">
                    <Clock className="w-4 h-4 text-background" />
                    <span className="text-sm font-semibold text-background">{scout.turnoPrincipal}</span>
                  </div>
                )}
              </div>
            </div>

            <CardContent className="space-y-3 pt-4 pb-4">
              <div className="flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-primary" />
                <span className="font-semibold text-base">{scout.nick}</span>
              </div>
              
              {scout.poder && (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="text-secondary font-bold text-base">{scout.poder}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span className="text-sm">{scout.cla}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Languages className="w-4 h-4" />
                <span className="text-sm">{scout.idioma}</span>
              </div>
              
              {scout.funcaoWB && (
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium text-sm">{scout.funcaoWB}</span>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground/70 pt-2 border-t border-border/50">
                {new Date(scout.timestamp).toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// ==================== SCOUT FILTERS COMPONENT ====================
interface ScoutFiltersProps {
  clanFilter: string;
  idiomaFilter: string;
  searchTerm: string;
  mapaFilter: string;
  turnoFilter: string;
  funcaoWBFilter: string;
  onClanFilterChange: (value: string) => void;
  onIdiomaFilterChange: (value: string) => void;
  onSearchTermChange: (value: string) => void;
  onMapaFilterChange: (value: string) => void;
  onTurnoFilterChange: (value: string) => void;
  onFuncaoWBFilterChange: (value: string) => void;
}

const ScoutFilters = ({
  clanFilter,
  idiomaFilter,
  searchTerm,
  mapaFilter,
  turnoFilter,
  funcaoWBFilter,
  onClanFilterChange,
  onIdiomaFilterChange,
  onSearchTermChange,
  onMapaFilterChange,
  onTurnoFilterChange,
  onFuncaoWBFilterChange,
}: ScoutFiltersProps) => {
  return (
    <div className="space-y-4 bg-card border border-primary/20 rounded-lg p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nick, mapa ou clã..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10 bg-muted border-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select value={mapaFilter} onValueChange={onMapaFilterChange}>
          <SelectTrigger className="bg-muted border-border">
            <SelectValue placeholder="Filtrar por mapa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os mapas</SelectItem>
            <SelectItem value="LAB BICHEON">LAB BICHEON</SelectItem>
            <SelectItem value="LAB TOURO">LAB TOURO</SelectItem>
            <SelectItem value="LAB SERPENTE">LAB SERPENTE</SelectItem>
            <SelectItem value="MYSTIC">MYSTIC</SelectItem>
            <SelectItem value="SNAKE">SNAKE</SelectItem>
          </SelectContent>
        </Select>

        <Select value={turnoFilter} onValueChange={onTurnoFilterChange}>
          <SelectTrigger className="bg-muted border-border">
            <SelectValue placeholder="Filtrar por turno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os turnos</SelectItem>
            <SelectItem value="Manhã">Manhã</SelectItem>
            <SelectItem value="Tarde">Tarde</SelectItem>
            <SelectItem value="Noite">Noite</SelectItem>
            <SelectItem value="Madrugada">Madrugada</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={idiomaFilter} onValueChange={onIdiomaFilterChange}>
          <SelectTrigger className="bg-muted border-border">
            <SelectValue placeholder="Filtrar por idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os idiomas</SelectItem>
            <SelectItem value="PT">PT</SelectItem>
            <SelectItem value="EN">EN</SelectItem>
            <SelectItem value="ES">ES</SelectItem>
            <SelectItem value="CN">CN</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Filtrar por clã..."
          value={clanFilter}
          onChange={(e) => onClanFilterChange(e.target.value)}
          className="bg-muted border-border"
        />

        <Input
          placeholder="Filtrar por função WB..."
          value={funcaoWBFilter}
          onChange={(e) => onFuncaoWBFilterChange(e.target.value)}
          className="bg-muted border-border"
        />
      </div>
    </div>
  );
};

// ==================== TABLE VIEW COMPONENT ====================
interface TableViewProps {
  scouts: Scout[];
  onDeleteScout: (id: string) => void;
}

const TableView = ({ scouts, onDeleteScout }: TableViewProps) => {
  if (scouts.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-lg">
        <p className="text-muted-foreground text-lg">Nenhum scout cadastrado</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-primary/20 rounded-lg overflow-hidden shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/30 bg-muted/10">
            <TableHead className="text-foreground font-display font-semibold text-base">MAPA</TableHead>
            <TableHead className="text-foreground font-display font-semibold text-base">TURNO</TableHead>
            <TableHead className="text-foreground font-display">NICK</TableHead>
            <TableHead className="text-foreground font-display">PODER</TableHead>
            <TableHead className="text-foreground font-display">CLÃ</TableHead>
            <TableHead className="text-foreground font-display">IDIOMA</TableHead>
            <TableHead className="text-foreground font-display">FUNÇÃO WB</TableHead>
            <TableHead className="text-foreground font-display text-right">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scouts.map((scout) => (
            <TableRow key={scout.id} className="border-border hover:bg-muted/20 transition-colors">
              <TableCell className="py-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-4 py-2 rounded-lg shadow-glow border-2 border-primary/30">
                  <Map className="w-5 h-5 text-background animate-pulse" />
                  <span className="font-bold text-background text-lg font-display tracking-wide">{scout.mapa}</span>
                </div>
              </TableCell>
              <TableCell className="py-4">
                {scout.turnoPrincipal ? (
                  <Badge className="bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-background border-2 border-secondary/40 font-bold text-base px-4 py-2 shadow-glow-red">
                    <Timer className="w-5 h-5 mr-2 animate-pulse" />
                    <span className="tracking-wider">{scout.turnoPrincipal}</span>
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-foreground font-medium">{scout.nick}</TableCell>
              <TableCell className="text-secondary font-bold">{scout.poder || "-"}</TableCell>
              <TableCell className="text-muted-foreground">{scout.cla}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-primary/40">
                  {scout.idioma}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{scout.funcaoWB || "-"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteScout(scout.id)}
                  className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// ==================== TIMELINE COMPONENT ====================
interface TimelineProps {
  scouts: Scout[];
}

const Timeline = ({ scouts }: TimelineProps) => {
  const sortedScouts = [...scouts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sortedScouts.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-lg">
        <p className="text-muted-foreground text-lg">Nenhuma atividade recente</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedScouts.map((scout, index) => (
        <div key={scout.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-primary shadow-glow" />
            {index < sortedScouts.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/50 to-transparent min-h-[40px]" />
            )}
          </div>
          
          <Card className="flex-1 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    Novo Scout Cadastrado
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(scout.timestamp).toLocaleString('pt-BR')}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded">
                  {scout.idioma}
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{scout.mapa}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4 text-secondary" />
                  <span>{scout.nick}</span>
                  <span>•</span>
                  <span>{scout.cla}</span>
                </div>
                {scout.poder && (
                  <div className="text-xs text-muted-foreground">
                    Poder: <span className="text-secondary font-semibold">{scout.poder}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

// ==================== MAIN INDEX COMPONENT ====================
const IndexPage = () => {
  const { t } = useLanguage();
  const [scouts, setScouts] = useState<Scout[]>(() => {
    const saved = localStorage.getItem("mir4-scouts");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [clanFilter, setClanFilter] = useState("");
  const [idiomaFilter, setIdiomaFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [mapaFilter, setMapaFilter] = useState("all");
  const [turnoFilter, setTurnoFilter] = useState("all");
  const [funcaoWBFilter, setFuncaoWBFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem("mir4-scouts", JSON.stringify(scouts));
  }, [scouts]);

  const handleAddScout = (scout: Scout) => {
    setScouts([scout, ...scouts]);
    setIsDialogOpen(false);
  };

  const handleDeleteScout = (id: string) => {
    setScouts(scouts.filter(s => s.id !== id));
  };

  const handleImport = (importedScouts: Scout[]) => {
    setScouts(importedScouts);
  };

  const handleDashboardCardClick = (cardTitle: string) => {
    setActiveTab("grid");
    toast({
      title: "Visualizando: " + cardTitle,
      description: "Navegando para a visualização de cards",
    });
  };

  const filteredScouts = scouts.filter(scout => {
    const matchesClan = !clanFilter || scout.cla.toLowerCase().includes(clanFilter.toLowerCase());
    const matchesIdioma = idiomaFilter === "all" || scout.idioma === idiomaFilter;
    const matchesMapa = mapaFilter === "all" || scout.mapa === mapaFilter;
    const matchesTurno = turnoFilter === "all" || scout.turnoPrincipal === turnoFilter;
    const matchesFuncaoWB = !funcaoWBFilter || scout.funcaoWB.toLowerCase().includes(funcaoWBFilter.toLowerCase());
    const matchesSearch = !searchTerm || 
      scout.nick.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scout.mapa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scout.cla.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClan && matchesIdioma && matchesSearch && matchesMapa && matchesTurno && matchesFuncaoWB;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header scouts={scouts} onImport={handleImport} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="dashboard" className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <TabsList className="bg-card border border-primary/20 shadow-card">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-background">
                <BarChart3 className="w-4 h-4 mr-2" />
                {t('tabs.dashboard')}
              </TabsTrigger>
              <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-background">
                <LayoutGrid className="w-4 h-4 mr-2" />
                {t('tabs.cards')}
              </TabsTrigger>
              <TabsTrigger value="table" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-background">
                <TableIcon className="w-4 h-4 mr-2" />
                {t('tabs.table')}
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-background">
                <Activity className="w-4 h-4 mr-2" />
                {t('tabs.timeline')}
              </TabsTrigger>
            </TabsList>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:shadow-glow transition-all shadow-card">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('tabs.newScout')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-primary/20">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl bg-gradient-primary bg-clip-text text-transparent">
                    {t('form.title')}
                  </DialogTitle>
                </DialogHeader>
                <ScoutForm onAddScout={handleAddScout} />
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard scouts={scouts} onCardClick={handleDashboardCardClick} />
          </TabsContent>

          <TabsContent value="grid" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
                  {t('list.activeScouts')} ({filteredScouts.length})
                </h2>
              </div>
              
              <ScoutFilters
                clanFilter={clanFilter}
                idiomaFilter={idiomaFilter}
                searchTerm={searchTerm}
                mapaFilter={mapaFilter}
                turnoFilter={turnoFilter}
                funcaoWBFilter={funcaoWBFilter}
                onClanFilterChange={setClanFilter}
                onIdiomaFilterChange={setIdiomaFilter}
                onSearchTermChange={setSearchTerm}
                onMapaFilterChange={setMapaFilter}
                onTurnoFilterChange={setTurnoFilter}
                onFuncaoWBFilterChange={setFuncaoWBFilter}
              />
              
              <ScoutList scouts={filteredScouts} onDeleteScout={handleDeleteScout} />
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
                  {t('list.tableView')} ({filteredScouts.length})
                </h2>
              </div>
              
              <ScoutFilters
                clanFilter={clanFilter}
                idiomaFilter={idiomaFilter}
                searchTerm={searchTerm}
                mapaFilter={mapaFilter}
                turnoFilter={turnoFilter}
                funcaoWBFilter={funcaoWBFilter}
                onClanFilterChange={setClanFilter}
                onIdiomaFilterChange={setIdiomaFilter}
                onSearchTermChange={setSearchTerm}
                onMapaFilterChange={setMapaFilter}
                onTurnoFilterChange={setTurnoFilter}
                onFuncaoWBFilterChange={setFuncaoWBFilter}
              />
              
              <TableView scouts={filteredScouts} onDeleteScout={handleDeleteScout} />
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
                {t('list.timelineLine')}
              </h2>
              
              <Timeline scouts={scouts} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }} />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexPage />
    </LanguageProvider>
  );
};

export default Index;