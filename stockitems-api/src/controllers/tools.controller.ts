import { Request, Response } from "express";
import dotenv from "dotenv";
import {ITools, RequsetAndTools} from "../interfaces/tools.interface"

import { Model } from "sequelize";
import { Tools } from "../models/tools.model";



dotenv.config();

 



const createTools = async (req: Request, res: Response) => {
    try {
      const {
        name,
        date,
        count,
      }: {
        name: string;
        date: string;
        count: string;
      } = req.body;
  
      const data = {
        name,
        date,
        count,
      };
      const toolsCreate: Model<ITools> | null = await Tools.create({
        ...data,
      });
  
      if (!toolsCreate) {
        return res.status(404).json({ message: "Fail to Create" });
      }
  
      return res.status(201).json({ message: "Create Tools success" });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

const getTools = async (req: RequsetAndTools, res: Response) => {
    try {
        const allTools: Model<ITools>[] = await Tools.findAll();

        return res.status(200).json({
            totle: allTools.length,
            items: allTools,
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
        })
    }
};



const updateTools = async (req: RequsetAndTools, res: Response) => {
    try {
        const { id } = req.params;
        const { name, date, count} = req.body;
        const updateTools: any = await Tools.update(
            {
                name,
                date,
                count,
            },
            {
                where: {
                    id,
                },
            }
        );
        return res.status(200).json ({ message: "Update Success "});

    } catch (error) {
        return res.status(500).json({ massage: "Something went wrong "});
    }
};



const deleteTools = async (req: RequsetAndTools, res: Response) => {
    try {
        const { id } = req.params;
        const tools: ITools =  req.tools!;

        const deleteTools: null | Model<ITools> = await Tools.findOne({
            where: {
                id,
            },
        });

        if (!deleteTools) {
            return res.status(404).json({
                message: "Tools Note found",
            });
            
            await deleteTools?.destroy();
        }
        return res.status(200).json({
            message: "Tools Deleted",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export default {
    createTools,
    getTools,
    updateTools,
    deleteTools,
};