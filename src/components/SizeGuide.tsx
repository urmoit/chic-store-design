import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const sizeDataCM = [
  { size: 'XS', chest: '86-91', waist: '71-76', hips: '86-91' },
  { size: 'S', chest: '91-96', waist: '76-81', hips: '91-96' },
  { size: 'M', chest: '96-101', waist: '81-86', hips: '96-101' },
  { size: 'L', chest: '101-106', waist: '86-91', hips: '101-106' },
  { size: 'XL', chest: '106-111', waist: '91-96', hips: '106-111' },
  { size: '2XL', chest: '111-116', waist: '96-101', hips: '111-116' },
  { size: '3XL', chest: '116-121', waist: '101-106', hips: '116-121' },
];

const sizeDataInches = [
  { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36' },
  { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38' },
  { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40' },
  { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42' },
  { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44' },
  { size: '2XL', chest: '44-46', waist: '38-40', hips: '44-46' },
  { size: '3XL', chest: '46-48', waist: '40-42', hips: '46-48' },
];

export function SizeGuide() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 px-0">
          <Ruler className="h-4 w-4" />
          {t('product.sizeGuide')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('product.sizeGuide')}</DialogTitle>
          <DialogDescription>
            {t('product.sizeGuideDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="cm" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="cm">CM</TabsTrigger>
            <TabsTrigger value="inches">Inches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cm">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">{t('product.size')}</TableHead>
                    <TableHead className="font-semibold">{t('product.chest')}</TableHead>
                    <TableHead className="font-semibold">{t('product.waist')}</TableHead>
                    <TableHead className="font-semibold">{t('product.hips')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeDataCM.map((row) => (
                    <TableRow key={row.size}>
                      <TableCell className="font-medium">{row.size}</TableCell>
                      <TableCell>{row.chest}</TableCell>
                      <TableCell>{row.waist}</TableCell>
                      <TableCell>{row.hips}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="inches">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">{t('product.size')}</TableHead>
                    <TableHead className="font-semibold">{t('product.chest')}</TableHead>
                    <TableHead className="font-semibold">{t('product.waist')}</TableHead>
                    <TableHead className="font-semibold">{t('product.hips')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeDataInches.map((row) => (
                    <TableRow key={row.size}>
                      <TableCell className="font-medium">{row.size}</TableCell>
                      <TableCell>{row.chest}</TableCell>
                      <TableCell>{row.waist}</TableCell>
                      <TableCell>{row.hips}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-semibold mb-2">{t('product.howToMeasure')}</h4>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li><strong>{t('product.chest')}:</strong> {t('product.chestMeasure')}</li>
            <li><strong>{t('product.waist')}:</strong> {t('product.waistMeasure')}</li>
            <li><strong>{t('product.hips')}:</strong> {t('product.hipsMeasure')}</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}