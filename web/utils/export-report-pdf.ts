import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas-pro'

export async function exportReportToPdf(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    width: element.scrollWidth,
    height: element.scrollHeight,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  })

  const imageData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imageWidth = pageWidth
  const imageHeight = (canvas.height * imageWidth) / canvas.width

  let heightLeft = imageHeight
  let position = 0

  pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imageHeight
    pdf.addPage()
    pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight)
    heightLeft -= pageHeight
  }

  pdf.save(filename)
}
