import * as XLSX from 'xlsx'

export function downloadScores(scores) {
  const rows = scores.map((score) => ({
    Student: score.name,
    Email: score.email,
    Pretest: score.pretest,
    Final: score.final,
    Average: score.average,
    Status: score.status
  }))
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Scores')
  XLSX.writeFile(workbook, 'GENELInK_Student_Scores.xlsx')
}
