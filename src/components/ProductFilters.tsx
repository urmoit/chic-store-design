import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

export interface FilterState {
  category: string;
  priceRange: string;
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

const priceRanges = [
  { value: 'all', labelKey: 'filter.allPrices' },
  { value: '0-25', label: '$0 - $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100+', label: '$100+' },
];

const sortOptions = [
  { value: 'default', labelKey: 'filter.default' },
  { value: 'price-asc', labelKey: 'filter.priceLowHigh' },
  { value: 'price-desc', labelKey: 'filter.priceHighLow' },
  { value: 'name-asc', labelKey: 'filter.nameAZ' },
  { value: 'name-desc', labelKey: 'filter.nameZA' },
];

export function ProductFilters({ filters, onFilterChange, categories }: ProductFiltersProps) {
  const { t } = useLanguage();

  const hasActiveFilters = filters.category !== 'all' || filters.priceRange !== 'all' || filters.sortBy !== 'default';

  const clearFilters = () => {
    onFilterChange({ category: 'all', priceRange: 'all', sortBy: 'default' });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {/* Category Filter */}
      <Select
        value={filters.category}
        onValueChange={(value) => onFilterChange({ ...filters, category: value })}
      >
        <SelectTrigger className="w-[180px] bg-secondary border-border">
          <SelectValue placeholder={t('filter.category')} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">{t('filter.allCategories')}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Price Range Filter */}
      <Select
        value={filters.priceRange}
        onValueChange={(value) => onFilterChange({ ...filters, priceRange: value })}
      >
        <SelectTrigger className="w-[180px] bg-secondary border-border">
          <SelectValue placeholder={t('filter.priceRange')} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {priceRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.labelKey ? t(range.labelKey) : range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort By */}
      <Select
        value={filters.sortBy}
        onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
      >
        <SelectTrigger className="w-[180px] bg-secondary border-border">
          <SelectValue placeholder={t('filter.sortBy')} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          {t('filter.clearFilters')}
        </Button>
      )}
    </div>
  );
}
