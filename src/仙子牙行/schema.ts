export const Schema = z.object({
  世界: z.object({
    当前区域: z.string(),
    当前场景: z.string(),
    当前时间: z.string(),
  }),
  主角: z.object({
    灵石: z.coerce.number(),
    声誉: z.coerce.number(),
    修为: z.string(),
  }),
  仙子图鉴: z.record(z.object({
    好感度: z.coerce.number(),
    淫乱度: z.coerce.number(),
    价格: z.coerce.number(),
    状态: z.string(),
    类型: z.string(),
    外貌特征: z.string(),
    身体改造: z.array(z.string()),
    体型: z.string(),
    性格标签: z.array(z.string()),
  })),
  掌柜: z.object({
    好感度: z.coerce.number(),
    信任度: z.coerce.number(),
  }),
  当前互动仙子: z.string(),
  场景状态: z.object({
    日次: z.coerce.number(),
  }),
});
export type Schema = z.output<typeof Schema>;
